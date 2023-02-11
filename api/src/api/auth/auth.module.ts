import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthClientModule } from '@src/api/auth/client/auth.module';

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
})
export class AuthModule {}
