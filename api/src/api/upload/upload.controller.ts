import { Body, Controller, Post, Version } from '@nestjs/common';
import { UploadService } from '@src/api/upload/upload.service';
import { PresignedRequestDto } from '@src/api/upload/dto/presignedRequest.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('파일 업로드')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    summary: 'S3 presigned url 요청',
    description: 'S3 presigned url 요청',
  })
  @Version('1')
  @Post('/presigned')
  async getPresignedPost(@Body() requestDto: PresignedRequestDto) {
    return this.uploadService.getPresignedPost(requestDto);
  }
}
