import {
  Controller,
  Post,
  Body,
  Version,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@src/api/auth/client/auth.service';
import { LoginRequestDto } from '@src/api/auth/client/dto/loginRequest.dto';
import { ClientJwtAuthGuard } from '@src/guards/clientJwtAuth.guard';
import { CurrentUser } from '@src/decorator/currentUser.decorator';
import { UserEntity } from '@src/entity/user/user.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponseDto } from '@src/api/auth/client/dto/authResponse.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    description: '로그인',
  })
  @ApiOkResponse({ type: AuthResponseDto })
  @Version('1')
  @Post('/login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '로그아웃',
    description:
      '로그아웃합니다. 세션아이디가 초기화 되어, 토큰이 무효화 됩니다.',
  })
  @UseGuards(ClientJwtAuthGuard)
  @Version('1')
  @Delete('/logout')
  async logout(@CurrentUser() user: UserEntity) {
    return user;
  }
}
