import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@src/entity/user/user.entity';

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(
    user: UserEntity,
    sessionId: string,
  ): Promise<[string, string]> {
    return Promise.all([
      this.jwtService.sign(
        {
          id: user.id,
          nickname: user.nickname,
          sessionId,
        },
        {
          expiresIn: '1h',
        },
      ),
      this.jwtService.sign(
        {
          id: user.id,
          sessionId,
        },
        {
          expiresIn: '6h',
        },
      ),
    ]);
  }
}
