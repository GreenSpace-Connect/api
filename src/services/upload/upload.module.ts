import { Module } from '@nestjs/common';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  providers: [CloudinaryProvider, UploadService],
  exports: [CloudinaryProvider, UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
