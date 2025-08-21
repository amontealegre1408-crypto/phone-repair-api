import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the customer',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the customer',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Unique email of the customer',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+573001112233',
    description: 'Phone number of the customer',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '123 Main St, New York',
    description: 'Optional address of the customer',
    required: false,
  })
  @IsOptional()
  address?: string;
}
