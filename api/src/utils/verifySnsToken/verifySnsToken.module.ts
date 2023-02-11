import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@src/configuration/validation';
import { VerifySnsTokenService } from '@src/utils/verifySnsToken/verifySnsToken.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECT'),
      }),
    }),
  ],
  providers: [VerifySnsTokenService],
  exports: [VerifySnsTokenService],
})
export class VerifySnsTokenModule {}
