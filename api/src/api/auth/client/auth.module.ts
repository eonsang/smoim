import { Module } from '@nestjs/common';
import { AuthTokenModule } from '@src/utils/authToken/authToken.module';
import { AuthController } from '@src/api/auth/client/auth.controller';
import { AuthService } from '@src/api/auth/client/auth.service';
import { ClientJwtStrategy } from '@src/api/auth/client/strategy/clientJwt.strategy';
import { VerifySnsTokenModule } from '@src/utils/verifySnsToken/verifySnsToken.module';
import { UserEntityModule } from '@src/entity/user/user.modue';
import { ClientUserModule } from '@src/api/user/client/user.module';

@Module({
  imports: [
    UserEntityModule,
    AuthTokenModule,
    VerifySnsTokenModule,
    ClientUserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ClientJwtStrategy],
})
export class AuthClientModule {}
