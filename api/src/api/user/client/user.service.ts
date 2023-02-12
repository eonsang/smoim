import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signUpRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserProviderEnum } from '@src/entity/user/user.entity';
import { Repository } from 'typeorm';
import * as randomstring from 'randomstring';
import { convert, LocalDateTime } from '@js-joda/core';
import { VerifySnsTokenService } from '@src/utils/verifySnsToken/verifySnsToken.service';
import { AuthTokenService } from '@src/utils/authToken/authToken.service';
import { AuthResponseDto } from '@src/api/auth/client/dto/authResponse.dto';
import { UpdateMyInfoRequestDto } from '@src/api/user/client/dto/updateMyInfoRequest.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly verifySnsTokenService: VerifySnsTokenService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async findUserById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async signUp(signUpRequestDto: SignUpRequestDto): Promise<AuthResponseDto> {
    let tokenId: string;
    let tokenEmail: string;
    if (signUpRequestDto.provider === UserProviderEnum.google) {
      const { id, email } = await this.verifySnsTokenService.checkGoogleToken(
        signUpRequestDto.token,
      );
      tokenId = id;
      tokenEmail = email;
    }
    const sessionId = randomstring.generate(32);
    const exist = await this.userRepository.findOneBy([
      {
        email: tokenEmail,
      },
      {
        provider: signUpRequestDto.provider,
        providerId: tokenId,
      },
    ]);

    if (exist) {
      throw new ConflictException('이미 가입된 계정정보 입니다.');
    }

    const userEntity = this.userRepository.create({
      sessionId,
      email: tokenEmail,
      provider: signUpRequestDto.provider,
      providerId: tokenId,
      nickname: signUpRequestDto.nickname,
      lastLogin: LocalDateTime.now(),
    });

    const user = await this.userRepository.save(userEntity);

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

  async withdraw(user: UserEntity) {
    user.sessionId = null;
    user.deletedAt = convert(LocalDateTime.now()).toDate();
    await this.userRepository.update(user.id, user);
  }

  async updateMyInfo(
    user: UserEntity,
    updateMyInfoRequestDto: UpdateMyInfoRequestDto,
  ) {
    user.nickname = updateMyInfoRequestDto.nickname;
    await this.userRepository.update(user.id, user);
    return user;
  }
}
