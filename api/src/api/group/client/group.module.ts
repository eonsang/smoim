import { Module } from '@nestjs/common';
import { GroupController } from '@src/api/group/client/group.controller';
import { GroupService } from '@src/api/group/client/group.service';

import { GroupEntityModule } from '@src/entity/group/group.module';

@Module({
  imports: [GroupEntityModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupClientModule {}
