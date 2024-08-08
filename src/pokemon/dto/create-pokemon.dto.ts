import { IsInt,  IsPositive,  IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

      // isInt, isPositive, min 1
      @IsInt()
      @Min(1)
      @IsPositive()
      no: number;
  
      // isString, Minlenth 1
      @IsString()
      @MinLength(1)
      name: string;

      // isInt, isPositive, min 1
      @IsInt()
      @Min(1)
      @IsPositive()
      num: number;

}



