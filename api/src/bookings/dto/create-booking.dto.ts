import { IsString, IsInt, IsOptional, IsEmail, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty() @IsString() guestName: string;
  @ApiPropertyOptional() @IsEmail() @IsOptional() guestEmail?: string;
  @ApiProperty() @IsString() table: string;
  @ApiProperty() @IsInt() @Min(1) @Max(30) partySize: number;
  @ApiProperty() @IsString() time: string;
  @ApiProperty() @IsString() date: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}
