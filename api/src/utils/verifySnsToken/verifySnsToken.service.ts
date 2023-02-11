import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class VerifySnsTokenService {
  constructor(private readonly httpService: HttpService) {}

  async checkGoogleToken(token: string, providerId: string): Promise<boolean> {
    return this.httpService.axiosRef
      .get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
      )
      .then((res) => {
        if (res.data?.sub !== providerId) {
          throw new BadRequestException('잘못된 인증 정보 입니다.');
        }
        return true;
      })
      .catch((err) => {
        throw err;
      });
  }
}
