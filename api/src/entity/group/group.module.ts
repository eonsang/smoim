import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '@src/entity/group/group.entity';
import { GroupContentEntity } from '@src/entity/group/groupContent.entity';
import { GroupContentChapterEntity } from '@src/entity/group/groupContentChapter.entity';
import { GroupContentChapterAttachmentEntity } from '@src/entity/group/groupContentChapterAttachment.entity';
import { GroupJoinEntity } from '@src/entity/group/groupJoin.entity';
import { GroupAssignmentEntity } from '@src/entity/group/groupAssignment.entity';
import { GroupAssignmentCommentEntity } from '@src/entity/group/groupAssignmentComment.entity';
import { GroupAssignmentAttachmentEntity } from '@src/entity/group/groupAssignmentAttachment.entity';
import { GroupCommentEntity } from '@src/entity/group/groupComment.entity';
import { GroupCommentAttachmentEntity } from '@src/entity/group/groupCommentAttachment.entity';
import { GroupAssignmentCommentAttachmentEntity } from '@src/entity/group/groupAssignmentCommentAttachment.entity';
import { GroupContentAttachmentEntity } from '@src/entity/group/groupContentAttachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupEntity,
      GroupContentEntity,
      GroupContentAttachmentEntity,
      GroupContentChapterEntity,
      GroupContentChapterAttachmentEntity,
      GroupJoinEntity,
      GroupAssignmentEntity,
      GroupAssignmentAttachmentEntity,
      GroupAssignmentCommentEntity,
      GroupAssignmentCommentAttachmentEntity,
      GroupCommentEntity,
      GroupCommentAttachmentEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class GroupEntityModule {}
