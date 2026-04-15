import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, access_token } = req.user;
    const trimmedUser = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const userData = encodeURIComponent(JSON.stringify(trimmedUser));
    res.redirect(`http://localhost:3000/auth-callback?token=${access_token}&user=${userData}`);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, access_token } = req.user;
    const trimmedUser = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const userData = encodeURIComponent(JSON.stringify(trimmedUser));
    res.redirect(`http://localhost:3000/auth-callback?token=${access_token}&user=${userData}`);
  }
}
