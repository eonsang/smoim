import { Controller, Get, Post, Body, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequestDto } from './dto/signUpRequest.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Version('1')
  @Post()
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.userService.signUp(signUpRequestDto);
  }
}
