import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginRequestDto } from '@src/api/auth/client/dto/loginRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserProviderEnum } from '@src/entity/user/user.entity';
import { Repository } from 'typeorm';
import { VerifySnsTokenService } from '@src/utils/verifySnsToken/verifySnsToken.service';
import { AuthResponseDto } from '@src/api/auth/client/dto/authResponse.dto';
import * as randomstring from 'randomstring';
import { LocalDateTime } from '@js-joda/core';
import { AuthTokenService } from '@src/utils/authToken/authToken.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly verifySnsTokenService: VerifySnsTokenService,
    private readonly authTokenService: AuthTokenService,
  ) {}
  async login(loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> {
    let tokenId: string;

    if (loginRequestDto.provider === UserProviderEnum.google) {
      const { id } = await this.verifySnsTokenService.checkGoogleToken(
        loginRequestDto.token,
      );
      tokenId = id;
    }

    if (loginRequestDto.provider === UserProviderEnum.kakao) {
      const { id } = await this.verifySnsTokenService.checkKakaoToken(
        loginRequestDto.token,
      );
      tokenId = id;
    }

    const user = await this.userRepository.findOneBy({
      provider: loginRequestDto.provider,
      providerId: tokenId,
    });

    console.log('user', user);

    if (!user) {
      throw new NotFoundException({
        code: 40400,
        message: '가입된 회원이 아닙니다.',
      });
    }

    const sessionId = randomstring.generate(32);
    await this.userRepository.update(user.id, {
      sessionId,
      lastLogin: LocalDateTime.now(),
    });

    const [accessToken, refreshToken] = await this.authTokenService.getTokens(
      user,
      sessionId,
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async logout(user: UserEntity): Promise<void> {
    await this.userRepository.update(user.id, {
      sessionId: null,
    });
  }
}
