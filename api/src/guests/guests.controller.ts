import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('guests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('guests')
export class GuestsController {
  constructor(private service: GuestsService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateGuestDto) { return this.service.create(dto); }
  @Patch(':id/tier') updateTier(@Param('id') id: string, @Body('tier') tier: string) {
    return this.service.updateTier(id, tier as any);
  }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
