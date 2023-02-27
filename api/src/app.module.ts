import { Module } from '@nestjs/common';
import { DatabaseModule } from './entity/databaseModule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter, AllExceptionsFilter } from '@src/filter';

import { UserModule } from '@src/api/user/user.module';
import { HealthModule } from '@src/api/health/health.module';
import { AuthModule } from '@src/api/auth/auth.module';
import { GroupModule } from '@src/api/group/group.module';
import { UploadModule } from '@src/api/upload/upload.module';

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
    GroupModule,
    UploadModule,
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
