import {
  Controller,
  Get,
  Post,
  Version,
  UseGuards,
  Delete,
  Put,
  Query,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientJwtAuthGuard } from '@src/guards/clientJwtAuth.guard';
import { GroupService } from '@src/api/group/client/group.service';
import { FindAllGroupRequestDto } from '@src/api/group/client/dto/findAllGroupRequest.dto';
import { RegisterGroupRequestDto } from '@src/api/group/client/dto/registerGroupRequest.dto';
import { CurrentUser } from '@src/decorator/currentUser.decorator';
import { UserEntity } from '@src/entity/user/user.entity';

@ApiTags('모임')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({
    summary: '전체 그룹 조회',
  })
  // @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Get('/')
  async findAllGroup(@Query() requestDto: FindAllGroupRequestDto) {
    return this.groupService.findAllGroup(requestDto);
  }

  @ApiOperation({
    summary: '그룹 상세 조회',
  })
  // @ApiOkResponse({ type: UserEntity })
  @Version('1')
  @Get(':idGroup')
  async findOneGroup(@Param('idGroup', ParseIntPipe) idGroup: number) {
    console.log(idGroup);
    return this.groupService.findOneGroup(idGroup);
  }

  @ApiOperation({
    summary: '그룹 등록',
  })
  // @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Post()
  async registerGroup(
    @CurrentUser() user: UserEntity,
    @Body() requestBody: RegisterGroupRequestDto,
  ) {
    return this.groupService.registerGroup(user, requestBody);
  }

  @ApiOperation({
    summary: '내가 등록한 그룹 수정',
  })
  // @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Put('/:idGroup')
  async updateGroup() {}

  @ApiOperation({
    summary: '내가 등록한 그룹 삭제',
  })
  // @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Delete('/:idGroup')
  async deleteGroup() {}

  @ApiOperation({
    summary: '그룹 댓글 전체 조회',
  })
  // @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Get('/:idGroup/comments')
  async findAllGroupComments() {}

  @ApiOperation({
    summary: '그룹 댓글 등록',
  })
  // @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Post('/:idGroup/comment')
  async registerGroupComments() {}

  @ApiOperation({
    summary: '그룹 댓글 수정',
  })
  // @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Put('/comment/:idComment')
  async updateGroupComments() {}

  @ApiOperation({
    summary: '그룹 댓글 삭제',
  })
  // @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Delete('/comment/:idComment')
  async deleteGroupComments() {}
}
