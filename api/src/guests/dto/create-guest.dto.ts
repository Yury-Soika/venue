import { IsString, IsEmail, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGuestDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiPropertyOptional() @IsIn(['vip', 'regular', 'blacklist']) @IsOptional() tier?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}
