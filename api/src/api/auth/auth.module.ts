import { Module } from '@nestjs/common';
import { AuthClientModule } from '@src/api/auth/client/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AuthClientModule,
    RouterModule.register([
      {
        path: '/client',
        module: AuthClientModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
