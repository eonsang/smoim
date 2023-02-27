import { Module } from '@nestjs/common';
import { UploadController } from '@src/api/upload/upload.controller';
import { ConfigurationModule } from '@src/configuration/configuration.module';
import { UploadService } from '@src/api/upload/upload.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
