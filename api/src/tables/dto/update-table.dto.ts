import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableStatusDto {
  @ApiProperty({ enum: ['available', 'occupied', 'reserved', 'maintenance'] })
  @IsIn(['available', 'occupied', 'reserved', 'maintenance'])
  status: string;
}
