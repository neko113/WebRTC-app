import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { UsersRepository } from '~/modules/users/users.repository';
import type { KakaoProfile } from '../types';
import { uuid } from 'uuidv4';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    readonly configService: ConfigService,
    private readonly userRepository: UsersRepository,
  ) {
    const KAKAO_CLIENT_ID = configService.get<string>('kakao.client_id');
    const KAKAO_CALLBACK_URL = configService.get<string>('kakao.callback_url');

    super({
      clientID: KAKAO_CLIENT_ID,
      callbackURL: KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { id, kakao_account }: KakaoProfile = profile._json;
    try {
      const exUser = await this.userRepository.findUserByEmail(kakao_account?.email);
      if (exUser) {
        return done(null, {
          id: exUser.id,
          email: exUser.email,
        });
      }

      const newUser = await this.userRepository.createOAuthUser({
        email: kakao_account?.email,
        password: id + uuid(),
        provider: 'kakao',
        socialId: id.toString(),
      });

      return done(null, {
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      done(error);
    }
  }
}
