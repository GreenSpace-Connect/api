import { Injectable } from '@nestjs/common';
import { UploadDto } from './dto/upload.dto';
import { v2 } from 'cloudinary';
import { createReadStream } from 'streamifier';
import { UploadResponse } from './types/upload.type';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File, uploadFileDto: UploadDto) {
    return new Promise<UploadResponse>((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        { folder: uploadFileDto.filePlace },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
