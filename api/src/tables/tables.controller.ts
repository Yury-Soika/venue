import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TablesService } from './tables.service';
import { UpdateTableStatusDto } from './dto/update-table.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';

@ApiTags('tables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('tables')
export class TablesController {
  constructor(private service: TablesService) {}

  @Get()
  @CheckPolicies(a => a.can('read', 'Table'))
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @CheckPolicies(a => a.can('read', 'Table'))
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch(':id/status')
  @CheckPolicies(a => a.can('update', 'Table'))
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTableStatusDto) {
    return this.service.updateStatus(id, dto.status as any);
  }
}
