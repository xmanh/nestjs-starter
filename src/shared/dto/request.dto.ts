import { IsOptional, Min } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @Min(1)
  page = 1

  @IsOptional()
  @Min(1)
  perPage = 20
}
