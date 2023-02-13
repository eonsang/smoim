import {
  Controller,
  Get,
  Post,
  Body,
  Version,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequestDto } from './dto/signUpRequest.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientJwtAuthGuard } from '@src/guards/clientJwtAuth.guard';
import { CurrentUser } from '@src/decorator/currentUser.decorator';
import { UserEntity } from '@src/entity/user/user.entity';
import { UpdateMyInfoRequestDto } from '@src/api/user/client/dto/updateMyInfoRequest.dto';
import { AuthResponseDto } from '@src/api/auth/client/dto/authResponse.dto';
import { RedisCacheService } from '@src/utils/redisCache/redisCache.service';
import { isNil } from '@nestjs/common/utils/shared.utils';

@ApiTags('유저')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입',
  })
  @ApiOkResponse({ type: AuthResponseDto })
  @Version('1')
  @Post()
  async signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.userService.signUp(signUpRequestDto);
  }

  @ApiOperation({
    summary: '내 정보 조회',
    description: '내 정보 조회',
  })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Get('/me')
  async getMe(@CurrentUser() user: UserEntity) {
    return user;
  }

  @ApiOperation({
    summary: '회원 탈퇴',
    description: '회원 탈퇴',
  })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Delete('/me')
  async withdraw(@CurrentUser() user: UserEntity) {
    return this.userService.withdraw(user);
  }

  @ApiOperation({
    summary: '내 정보 수정',
    description: '내 정보 수정',
  })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Put('/me')
  async updateMyInfo(
    @CurrentUser() user: UserEntity,
    @Body() updateMyInfoRequestDto: UpdateMyInfoRequestDto,
  ) {
    return this.userService.updateMyInfo(user, updateMyInfoRequestDto);
  }
}
