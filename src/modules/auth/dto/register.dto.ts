import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../enum/role.enum';

export class RegisterDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Unique email for login',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'Admin1234',
    description: 'Password (min 6 chars)',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.MANAGER,
    required: false,
    description: 'Role of the user, defaults to MANAGER',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.MANAGER;
}
