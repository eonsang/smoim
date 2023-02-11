import { Module } from '@nestjs/common';
import { UserModule } from '@src/api/user/user.module';
import { DatabaseModule } from './entity/databaseModule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter, AllExceptionsFilter } from '@src/filter';
import {
  TimeoutInterceptor,
  TransformResponseInterceptor,
} from '@src/interceptor';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule,
    UserModule,
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

    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
