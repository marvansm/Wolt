export class CreateUserDto {
  email: string;
  password?: string;
  googleId?: string;
  githubId?: string;
  provider?: 'local' | 'google' | 'github';
  firstName: string;
  lastName: string;
  country?: string;
  phoneNumber?: string;
}
