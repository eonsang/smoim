import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@src/configuration/validation';
import { S3 } from '@aws-sdk/client-s3';
import {
  presignedMaxFileSize,
  PresignedRequestDto,
} from '@src/api/upload/dto/presignedRequest.dto';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

@Injectable()
export class UploadService {
  private readonly s3Client: S3;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.s3Client = new S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  async getPresignedPost(requestDto: PresignedRequestDto) {
    return await createPresignedPost(this.s3Client, {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: `origin/` + requestDto.fileKey,
      Expires: 60, // 1m
      Conditions: [
        ['content-length-range', 0, presignedMaxFileSize],
        ['eq', '$Content-Type', requestDto.type],
      ],
    });
  }
}
