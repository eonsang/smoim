import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { GroupClientModule } from '@src/api/group/client/group.module';
import { GroupEntityModule } from '@src/entity/group/group.module';

@Module({
  imports: [
    GroupEntityModule,
    GroupClientModule,
    RouterModule.register([
      {
        path: '/client',
        module: GroupClientModule,
      },
    ]),
  ],
  providers: [],
  exports: [],
})
export class GroupModule {}
