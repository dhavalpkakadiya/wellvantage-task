import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGymDto {
  @IsOptional()
  @IsString()
  gymName: string;

  @IsOptional()
  ownerFirstName: string;

  @IsOptional()
  ownerLastName: string;

  @IsOptional()
  addressLine1: string;

  @IsOptional()
  addressLine2?: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  country: string;

  @IsOptional()
  phoneNumber: string;
}
