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

export class QueryComplaintDto {
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