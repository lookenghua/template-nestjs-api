import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page = 1

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  size = 10
}
