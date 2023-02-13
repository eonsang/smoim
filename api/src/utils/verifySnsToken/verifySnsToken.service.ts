import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';

class ResponseVerifySnsToken {
  email: string;
  id: string;
}

@Injectable()
export class VerifySnsTokenService {
  constructor(private readonly httpService: HttpService) {}

  async checkGoogleToken(token: string): Promise<ResponseVerifySnsToken> {
    return this.httpService.axiosRef
      .get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
      )
      .then((res) => {
        return {
          id: res.data.sub,
          email: res.data.email,
        };
      })
      .catch((err) => {
        throw err;
      });
  }

  async checkKakaoToken(token: string): Promise<ResponseVerifySnsToken> {
    return this.httpService.axiosRef
      .post(
        `https://kapi.kakao.com/v2/user/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        return {
          // TODO:: 카카오 개발콘솔에서 이메일 활성화 켜기 / 검수 필요
          // 응답데이터에서 email 매핑 해주기
          id: res.data.id,
          email: '',
        };
      })
      .catch((err) => {
        throw err;
      });
  }
}
