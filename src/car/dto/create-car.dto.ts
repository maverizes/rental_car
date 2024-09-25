import { IsString, IsNumber, IsBoolean, Min, Max, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty({ message: 'Car name can not be empty' })
  @IsString({ message: 'Car name must be a string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Car brand can not be empty' })
  @IsString({ message: 'Car brand must be a string' })
  readonly brand: string;

  @IsNotEmpty({ message: 'Car type can not be empty' })
  @IsString({ message: 'Car type must be a string' })
  readonly type: string;

  @IsNotEmpty({ message: 'Car year can not be empty' })
  @IsNumber({}, { message: 'Year must be a number' })
  @Min(1886, { message: 'Year must not be earlier than 1886' })
  @Max(new Date().getFullYear(), { message: `Year must not be later than ${new Date().getFullYear()}` })
  readonly year: number;

  @IsNotEmpty({ message: 'Car rental-price can not be empty' })
  @IsNumber({}, { message: 'Rental price per day must be a number' })
  @Min(0, { message: 'Rental price must be at least 0' })
  readonly rentalPricePerDay: number;

  @IsNotEmpty({ message: 'Car status can not be empty' })
  @IsBoolean({ message: 'Available status must be a boolean' })
  @IsOptional()
  readonly available?: boolean;
}
