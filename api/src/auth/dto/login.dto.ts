import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'manager@venue.ee' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'demo1234' })
  @IsString()
  @MinLength(6)
  password: string;
}
