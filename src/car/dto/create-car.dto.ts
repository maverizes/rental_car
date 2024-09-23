import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateCarDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString()
  readonly type: string; 

  @IsNumber()
  readonly year: number;

  @IsNumber()
  readonly rentalPricePerDay: number;

  @IsBoolean()
  readonly available: boolean;
}
