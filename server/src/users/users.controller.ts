import { Controller, Get, Post, Body, Param, Patch, Req, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('verify-email')
  verifyEmail(@Body() body: { email: string; code: string }) {
    return this.usersService.verifyEmail(body.email, body.code);
  }

  @Post('resend-code')
  resendCode(@Body() body: { email: string }) {
    return this.usersService.resendVerificationCode(body.email);
  }

  @Post('change-email')
  changeEmail(@Body() body: { oldEmail: string; newEmail: string }) {
    return this.usersService.changePendingEmail(body.oldEmail, body.newEmail);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('social-login')
  socialLogin(@Body() data: any) {
    return this.usersService.findOrCreateSocialUser(data);
  }

  @Get('me')
  getMe(@Query('email') email: string) {
    if (!email) return null;
    return this.usersService.findByEmail(email);
  }

  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.usersService.forgotPassword(email);
  }

  @Post('reset-password')
  resetPassword(@Body() body: { email: string; code: string; newPassword: string }) {
    return this.usersService.resetPassword(body.email, body.code, body.newPassword);
  }

  @Post('request-profile-verification')
  requestProfileVerification(@Body() body: { userId?: string; email?: string; method: 'email' | 'phone' }) {
    if (!body.userId && body.email) {
      return this.usersService.findByEmail(body.email).then(user => {
        if (!user) throw new Error('User not found');
        return this.usersService.requestMethodVerification(user.id, body.method);
      });
    }
    return this.usersService.requestMethodVerification(body.userId as string, body.method);
  }

  @Post('verify-profile-method')
  verifyProfileMethod(@Body() body: { userId?: string; email?: string; method: 'email' | 'phone'; code: string }) {
    if (!body.userId && body.email) {
      return this.usersService.findByEmail(body.email).then(user => {
        if (!user) throw new Error('User not found');
        return this.usersService.verifyMethod(user.id, body.method, body.code);
      });
    }
    return this.usersService.verifyMethod(body.userId as string, body.method, body.code);
  }

  @Patch('update-profile')
  updateProfile(@Body() body: any) {
    // Note: In a real app we'd use @UseGuards(JwtAuthGuard) and get user from @Req()
    // For now we'll assume the email is passed for identification since we haven't set up Global Guards
    if (!body.userId && body.email) {
      return this.usersService.findByEmail(body.email).then(user => {
        if (!user) throw new Error('User not found');
        return this.usersService.updateProfile((user as any).id, body);
      });
    }
    return this.usersService.updateProfile(body.userId, body);
  }
}
