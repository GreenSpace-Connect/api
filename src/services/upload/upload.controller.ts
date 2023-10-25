import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { UploadDto } from './dto/upload.dto';

@Controller({
  path: 'upload',
  version: ['1.0.0'],
})
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024 * 10,
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadDto,
  ) {
    const result = await this.uploadService.uploadFile(file, uploadDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: result,
    });
  }
}
