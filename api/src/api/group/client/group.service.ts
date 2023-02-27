import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '@src/entity/group/group.entity';
import { FindAllGroupRequestDto } from '@src/api/group/client/dto/findAllGroupRequest.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { RegisterGroupRequestDto } from '@src/api/group/client/dto/registerGroupRequest.dto';
import { UserEntity } from '@src/entity/user/user.entity';
import { GroupContentEntity } from '@src/entity/group/groupContent.entity';
import { GroupChapterEntity } from '@src/entity/group/groupChapter.entity';
import { GroupContentAttachmentEntity } from '@src/entity/group/groupContentAttachment.entity';
import { GroupChapterAttachmentEntity } from '@src/entity/group/groupChapterAttachment.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,

    @InjectRepository(GroupContentEntity)
    private readonly groupContentRepository: Repository<GroupContentEntity>,

    @InjectRepository(GroupContentAttachmentEntity)
    private readonly groupContentAttachmentRepository: Repository<GroupContentAttachmentEntity>,

    @InjectRepository(GroupChapterEntity)
    private readonly groupChapterRepository: Repository<GroupChapterEntity>,

    @InjectRepository(GroupChapterAttachmentEntity)
    private readonly groupChapterAttachmentRepository: Repository<GroupChapterAttachmentEntity>,
  ) {}
  async findAllGroup(
    requestDto: FindAllGroupRequestDto,
  ): Promise<Pagination<GroupEntity>> {
    const queryBuilder = this.groupRepository
      .createQueryBuilder('group')
      .offset(requestDto.offset)
      .limit(requestDto.limit)
      .orderBy('group.createdAt', 'DESC');

    return paginate<GroupEntity>(queryBuilder, {
      limit: requestDto.limit,
      page: requestDto.page,
    });
  }
  async findOneGroup(idGroup: number): Promise<GroupEntity> {
    return await this.groupRepository
      .createQueryBuilder('group')
      .where('group.id = :idGroup', { idGroup })
      .getOneOrFail();
  }
  async registerGroup(user: UserEntity, requestBody: RegisterGroupRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.commitTransaction();

      const groupEntity = this.groupRepository.create();
      groupEntity.user = user;
      const group = await queryRunner.manager
        .getRepository(GroupEntity)
        .save(groupEntity);

      const groupContentEntity = this.groupContentRepository.create();
      groupContentEntity.group = group;
      groupContentEntity.startDate = requestBody.startDate;
      groupContentEntity.endDate = requestBody.endDate;
      groupContentEntity.information = requestBody.information;
      groupContentEntity.isApproval = requestBody.isApproval;
      groupContentEntity.maxUser = requestBody.maxUser;
      groupContentEntity.minUser = requestBody.minUser;
      groupContentEntity.isOpened = requestBody.isOpened;
      groupContentEntity.notice = requestBody.notice;
      groupContentEntity.subTitle = requestBody.subTitle;
      groupContentEntity.title = requestBody.title;
      groupContentEntity.thumbnail = requestBody.thumbnail;
      const groupContent = await queryRunner.manager
        .getRepository(GroupContentEntity)
        .save(groupContentEntity);

      await Promise.all(
        requestBody.attachments.map(async (attachment) => {
          const attachmentEntity =
            this.groupContentAttachmentRepository.create();
          attachmentEntity.key = attachment.key;
          attachmentEntity.originalName = attachment.originalName;
          attachmentEntity.type = attachment.type;
          attachmentEntity.groupContent = groupContent;

          await queryRunner.manager
            .getRepository(GroupContentAttachmentEntity)
            .save(attachmentEntity);
        }),
      );

      await Promise.all(
        requestBody.chapters.map(async (chapter) => {
          const groupChapterEntity = this.groupChapterRepository.create();
          groupChapterEntity.group = group;
          groupChapterEntity.title = chapter.title;
          groupChapterEntity.order = chapter.order;
          groupChapterEntity.information = chapter.information;
          groupChapterEntity.assignment = chapter.assignment;
          groupChapterEntity.date = chapter.date;
          const groupChapter = await queryRunner.manager
            .getRepository(GroupChapterEntity)
            .save(groupChapterEntity);

          await Promise.all(
            chapter.attachments.map(async (attachment) => {
              const attachmentEntity =
                this.groupChapterAttachmentRepository.create();
              attachmentEntity.key = attachment.key;
              attachmentEntity.originalName = attachment.originalName;
              attachmentEntity.type = attachment.type;
              attachmentEntity.groupChapter = groupChapter;

              await queryRunner.manager
                .getRepository(GroupContentAttachmentEntity)
                .save(attachmentEntity);
            }),
          );
        }),
      );

      return group;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async updateGroup() {}
  async deleteGroup() {}
}
