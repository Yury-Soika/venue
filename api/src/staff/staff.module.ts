import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from './staff.entity';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember])],
  providers: [StaffService],
  controllers: [StaffController],
})
export class StaffModule {}
