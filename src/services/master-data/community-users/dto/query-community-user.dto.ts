import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderBy } from '../enums/order-by.enum';
import {
  PaginatorLimit,
  PaginatorLimitArray,
} from 'src/utils/enums/paginator-limit.enum';
import { InArray } from 'src/utils/validators/in-array.validator';
import { OrderType } from 'src/utils/enums/order-type.enum';
import { Transform } from 'class-transformer';
import { toNumber } from 'src/utils/helper/cast.helper';

export class QueryCommunityUserDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page?: number;

  @InArray(PaginatorLimitArray)
  @IsOptional()
  perPage?: PaginatorLimit;

  @IsEnum(OrderBy)
  @IsOptional()
  orderBy?: OrderBy;

  @IsEnum(OrderType)
  @IsOptional()
  orderType?: OrderType;

  @IsOptional()
  search?: string;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsOptional()
  userId?: number;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsOptional()
  communityId?: number;

  get getOrderBy() {
    if (this.orderBy) {
      return {
        [this.orderBy]: this.orderType ?? OrderType.DESC,
      };
    }

    return {
      [OrderBy.UPDATEDAT]: OrderType.DESC,
    };
  }
}
