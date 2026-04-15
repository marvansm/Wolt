import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST') || 'smtp.gmail.com',
      port: this.configService.get<number>('MAIL_PORT') || 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendVerificationCode(to: string, code: string) {
    const mailOptions = {
      from: `"Wolt" <${this.configService.get<string>('MAIL_USER')}>`,
      to,
      subject: 'Your Wolt Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 32px; background: #f9f9f9; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #009de0; font-size: 28px; margin: 0;">Wolt</h1>
          </div>
          <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #eee;">
            <h2 style="color: #111; font-size: 20px; margin-top: 0;">Confirm your email address</h2>
            <p style="color: #555; font-size: 15px;">Use the following 6-digit code to verify your account:</p>
            <div style="font-size: 40px; font-weight: bold; text-align: center; letter-spacing: 10px; margin: 28px 0; color: #009de0; background: #f0f9ff; border-radius: 12px; padding: 20px;">
              ${code}
            </div>
            <p style="color: #888; font-size: 13px;">This code expires in 10 minutes. If you did not request this, please ignore this email.</p>
          </div>
          <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 24px;">© 2026 Wolt — All Rights Reserved</p>
        </div>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return info;
  }

  async sendPasswordResetCode(to: string, code: string) {
    const mailOptions = {
      from: `"Wolt" <${this.configService.get<string>('MAIL_USER')}>`,
      to,
      subject: 'Reset Your Wolt Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 32px; background: #f9f9f9; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #009de0; font-size: 28px; margin: 0;">Wolt</h1>
          </div>
          <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #eee;">
            <h2 style="color: #111; font-size: 20px; margin-top: 0;">Reset your password</h2>
            <p style="color: #555; font-size: 15px;">Use the following 6-digit code to reset your password:</p>
            <div style="font-size: 40px; font-weight: bold; text-align: center; letter-spacing: 10px; margin: 28px 0; color: #009de0; background: #f0f9ff; border-radius: 12px; padding: 20px;">
              ${code}
            </div>
            <p style="color: #888; font-size: 13px;">This code expires in 15 minutes. If you did not request a password reset, please ignore this email.</p>
          </div>
          <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 24px;">© 2026 Wolt — All Rights Reserved</p>
        </div>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return info;
  }
}
