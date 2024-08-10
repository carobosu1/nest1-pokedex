import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{

@IsOptional()
@IsPositive()
@Min(1)
limite?: number;

@IsOptional()
@IsPositive()
offset?: number;

}