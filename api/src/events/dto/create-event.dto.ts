import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() date: string;
  @ApiProperty() @IsString() time: string;
  @ApiProperty() @IsString() dj: string;
  @ApiProperty() @IsInt() @Min(1) ticketsTotal: number;
  @ApiProperty() @IsNumber() coverCharge: number;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
}
