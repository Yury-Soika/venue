import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TablesService } from './tables.service';
import { UpdateTableStatusDto } from './dto/update-table.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('tables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tables')
export class TablesController {
  constructor(private service: TablesService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body() dto: UpdateTableStatusDto) {
    return this.service.updateStatus(id, dto.status as any);
  }
}
