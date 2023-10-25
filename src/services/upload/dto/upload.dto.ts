import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FilePlace } from '../enums/file-place.enum';

export class UploadDto {
  @IsEnum(FilePlace)
  @IsNotEmpty()
  @ApiProperty()
  filePlace: FilePlace;

  // @ApiProperty()
  // file: Express.Multer.File;
}
