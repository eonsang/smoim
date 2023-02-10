import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {DatabaseModule} from "./common/entity/databaseModule";

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
