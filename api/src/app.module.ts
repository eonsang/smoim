import { Module } from '@nestjs/common';
import { UserModule } from '@src/api/user/user.module';
import { DatabaseModule } from './entity/databaseModule';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
