import { IsOptional } from "class-validator";

export class PaginatedDto<TData> {
  @IsOptional()
  total: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;

  results: TData[];
}
