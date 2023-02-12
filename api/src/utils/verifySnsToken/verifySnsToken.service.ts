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
}
