
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { UserRole } from '../role/role';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole;
}

