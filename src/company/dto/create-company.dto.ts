import { IsNotEmpty, IsString, IsOptional, IsEmail, IsUrl } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Name is required'})
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid'})
  email?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Website must be a valid URL'})
  website?: string;

  @IsOptional()
  logo?: string;
}