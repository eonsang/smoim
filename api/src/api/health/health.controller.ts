import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('힐스체크')
@Controller('health')
export class HealthController {
  @Get()
  findAll() {
    return 'OK';
  }
}
