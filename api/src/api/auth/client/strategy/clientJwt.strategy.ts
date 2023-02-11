import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@src/configuration/validation';
import { UserService } from '@src/api/user/client/user.service';
import { TokenDto } from '@src/api/auth/client/dto/token.dto';

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(
  Strategy,
  'client-jwt',
) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('CLIENT_JWT_SECRET_KEY'),
    });
  }

  async validate(payload: TokenDto) {
    const user = await this.userService.findUserById(payload.id);
    if (user.sessionId !== payload.sessionId) {
      throw new BadRequestException('세션정보가 일치하지 않습니다.');
    }

    return user;
  }
}
