import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL:
        process.env.GOOGLE_CALLBACK ||
        'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, emails, name, photos } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails && emails.length ? emails[0].value : null,
      name: name
        ? `${name.givenName || ''} ${name.familyName || ''}`.trim()
        : null,
      photo: photos && photos.length ? photos[0].value : null,
      accessToken,
    };
    done(null, user);
  }
}
