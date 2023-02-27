import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ClientUserModule } from './client/user.module';

@Module({
  imports: [
    ClientUserModule,
    RouterModule.register([
      {
        path: '/client',
        module: ClientUserModule,
      },
    ]),
  ],
  providers: [],
  exports: [],
})
export class UserModule {}
