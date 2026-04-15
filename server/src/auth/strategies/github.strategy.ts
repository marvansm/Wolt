import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID || 'dummy-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'dummy-secret',
      callbackURL: 'http://localhost:5000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const { displayName, emails, id, username } = profile;
    const names = (displayName || username || 'GitHub User').split(' ');
    
    const user = {
      email: emails?.[0]?.value || `${id}@github.com`,
      firstName: names[0],
      lastName: names.slice(1).join(' ') || 'User',
      githubId: id,
      provider: 'github',
    };
    
    const dbUser = await this.usersService.findOrCreateSocialUser(user as any);
    done(null, dbUser);
  }
}
