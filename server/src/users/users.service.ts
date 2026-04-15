import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const bcrypt = require('bcryptjs');
    const { password, ...userData } = createUserDto as any;
    
    if (!password || password.length < 6) {
      throw new UnauthorizedException('Password must be at least 6 characters');
    }

    // Check if email already exists
    const existingByEmail = await this.prisma.user.findUnique({ where: { email: userData.email } });
    if (existingByEmail) {
      throw new ConflictException('An account with this email already exists');
    }

    // Check if phone number already exists
    if (userData.phoneNumber) {
      const existingByPhone = await this.prisma.user.findFirst({ where: { phoneNumber: userData.phoneNumber } });
      if (existingByPhone) {
        throw new ConflictException('An account with this phone number already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        provider: 'local',
        isEmailVerified: false,
        isPhoneVerified: false,
        verificationCode,
      },
    });

    console.log('------------------------------------------');
    console.log(`VERIFICATION CODE FOR ${userData.email}: ${verificationCode}`);
    console.log('------------------------------------------');

    // Send verification email (non-blocking — failures are logged but don't break signup)
    try {
      await this.mailService.sendVerificationCode(userData.email, verificationCode);
    } catch (err) {
      console.error('Failed to send verification email:', err.message);
    }

    return {
      message: 'Verification code sent to your email',
      email: userData.email,
      requiresVerification: true,
    };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user) throw new UnauthorizedException('User not found');
    if (user.verificationCode !== code) throw new UnauthorizedException('Invalid verification code');

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationCode: null,
      },
    });

    const payload = { email: updatedUser.email, sub: updatedUser.id };
    return {
      user: updatedUser,
      access_token: this.jwtService.sign(payload),
    };
  }

  async resendVerificationCode(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');
    if (user.isEmailVerified) throw new UnauthorizedException('Account already verified');

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.prisma.user.update({
      where: { id: user.id },
      data: { verificationCode },
    });

    console.log('------------------------------------------');
    console.log(`[RESENT] VERIFICATION CODE FOR ${email}: ${verificationCode}`);
    console.log('------------------------------------------');

    try {
      await this.mailService.sendVerificationCode(email, verificationCode);
    } catch (err) {
      console.error('Failed to resend verification email:', err.message);
    }

    return { message: 'Code resent successfully' };
  }

  async login(loginUserDto: LoginUserDto) {
    const bcrypt = require('bcryptjs');
    const user = await this.prisma.user.findUnique({ where: { email: loginUserDto.email } });
    
    if (!user) throw new UnauthorizedException('User not found');
    if (user.provider !== 'local') throw new UnauthorizedException(`Please login with ${user.provider}`);
    if (!user.isEmailVerified && !user.isPhoneVerified) throw new UnauthorizedException('Please verify your email or phone first');
    if (!user.password) throw new UnauthorizedException('Authentication configuration error. Please contact support.');

    const isPasswordValid = await bcrypt.compare(loginUserDto.password || '', user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOrCreateSocialUser(data: { email: string, firstName: string, lastName: string, googleId?: string, githubId?: string, provider: 'google' | 'github' }) {
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { googleId: data.googleId },
          { githubId: data.githubId }
        ]
      }
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          ...data,
          isEmailVerified: true,
        } as any,
      });
    } else {
      const updateData: any = { isEmailVerified: true };
      if (!user[(data.provider + 'Id') as keyof typeof user]) {
        updateData[data.provider + 'Id'] = data.googleId || data.githubId;
      }
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });
    }

    const payload = { email: user.email, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePendingEmail(oldEmail: string, newEmail: string) {
    const user = await this.prisma.user.findUnique({ where: { email: oldEmail } });
    if (!user) throw new UnauthorizedException('User not found');
    if (user.isEmailVerified) throw new ConflictException('Account is already verified');

    const existing = await this.prisma.user.findUnique({ where: { email: newEmail } });
    if (existing) throw new ConflictException('This email is already registered');

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.prisma.user.update({
      where: { id: user.id },
      data: { email: newEmail, verificationCode },
    });

    console.log('------------------------------------------');
    console.log(`[CHANGED EMAIL] VERIFICATION CODE FOR ${newEmail}: ${verificationCode}`);
    console.log('------------------------------------------');

    try {
      await this.mailService.sendVerificationCode(newEmail, verificationCode);
    } catch (err) {
      console.error('Failed to send changed-email verification:', err.message);
    }

    return {
      message: 'Email updated. Verification code sent.',
      email: newEmail,
    };
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');
    if (user.provider !== 'local') throw new UnauthorizedException(`Please login with ${user.provider}`);

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordCode: resetCode,
        resetPasswordExpiresAt: expiresAt,
      },
    });

    console.log('------------------------------------------');
    console.log(`[FORGOT PASSWORD] RESET CODE FOR ${email}: ${resetCode}`);
    console.log('------------------------------------------');

    try {
      await this.mailService.sendPasswordResetCode(email, resetCode);
    } catch (err) {
      console.error('Failed to send password reset email:', err.message);
    }

    return { message: 'Password reset code sent' };
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const bcrypt = require('bcryptjs');
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.resetPasswordCode || user.resetPasswordCode !== code) throw new UnauthorizedException('Invalid reset code');
    if (user.resetPasswordExpiresAt && user.resetPasswordExpiresAt < new Date()) throw new UnauthorizedException('Reset code expired');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordCode: null,
        resetPasswordExpiresAt: null,
      },
    });

    return { message: 'Password successfully updated' };
  }

  async requestMethodVerification(userId: string, method: 'email' | 'phone') {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    
    if (method === 'email' && user.isEmailVerified) throw new ConflictException('Email already verified');
    if (method === 'phone' && user.isPhoneVerified) throw new ConflictException('Phone already verified');
    
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { verificationCode }
    });

    if (method === 'email') {
      try {
        await this.mailService.sendVerificationCode(user.email, verificationCode);
      } catch (err) {
        console.error('Failed to send email verification', err.message);
      }
    } else {
      console.log('------------------------------------------');
      console.log(`[SMS MOCK] VERIFICATION CODE FOR ${user.phoneNumber}: ${verificationCode}`);
      console.log('------------------------------------------');
    }

    return { message: `${method} verification code sent` };
  }

  async verifyMethod(userId: string, method: 'email' | 'phone', code: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    if (user.verificationCode !== code) throw new UnauthorizedException('Invalid verification code');

    const data: any = { verificationCode: null };
    if (method === 'email') data.isEmailVerified = true;
    if (method === 'phone') data.isPhoneVerified = true;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    return updatedUser;
  }

  async updateProfile(userId: string, updateData: Partial<any>) {
    const allowedFields = ['firstName', 'lastName', 'phoneNumber', 'country', 'email', 'avatar'];
    const filteredUpdate = Object.keys(updateData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    try {
      const currentUser = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!currentUser) throw new UnauthorizedException('User not found');

      if (filteredUpdate.email && filteredUpdate.email !== currentUser.email) {
        const existing = await this.prisma.user.findUnique({ where: { email: filteredUpdate.email } });
        if (existing) throw new ConflictException('This email is already registered');
        filteredUpdate.isEmailVerified = false;
        
        // Also regenerate a Verification Code so user can verify it later from profile
        filteredUpdate.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      }

      if (filteredUpdate.phoneNumber && filteredUpdate.phoneNumber !== currentUser.phoneNumber) {
        const existingByPhone = await this.prisma.user.findFirst({ where: { phoneNumber: filteredUpdate.phoneNumber } });
        if (existingByPhone) throw new ConflictException('An account with this phone number already exists');
        filteredUpdate.isPhoneVerified = false;
        
        // If they didn't just change email as well, re-generate code for phone
        if (!filteredUpdate.email) {
          filteredUpdate.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        }
      }

      return await this.prisma.user.update({
        where: { id: userId },
        data: filteredUpdate,
      });
    } catch (err: any) {
      if (err instanceof ConflictException) throw err;
      throw new UnauthorizedException('Update failed: ' + err.message);
    }
  }
}
