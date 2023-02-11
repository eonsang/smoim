import { Module } from '@nestjs/common';
import { UserModule } from '@src/api/user/user.module';
import { DatabaseModule } from './entity/databaseModule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter, AllExceptionsFilter } from '@src/filter';

import { HealthModule } from '@src/api/health/health.module';
import { AuthModule } from '@src/api/auth/auth.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
