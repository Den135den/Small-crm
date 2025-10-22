import { IsEmail, IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}
