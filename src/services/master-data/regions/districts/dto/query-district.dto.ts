import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderBy } from '../enums/order-by.enum';
import {
  PaginatorLimit,
  PaginatorLimitArray,
} from 'src/lib/enums/paginator-limit.enum';
import { InArray } from 'src/lib/validators/in-array.validator';
import { OrderType } from 'src/lib/enums/order-type.enum';

export class QueryDistrictDto {
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
