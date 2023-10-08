import { PartialType } from '@nestjs/swagger';
import { CreateGreenPlaceDto } from './create-green-place.dto';

export class UpdateGreenPlaceDto extends PartialType(CreateGreenPlaceDto) {}
