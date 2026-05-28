import { Module } from '@nestjs/common';
import { CaslModule } from '../casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './guest.entity';
import { GuestsService } from './guests.service';
import { GuestsController } from './guests.controller';

@Module({
  imports: [CaslModule, TypeOrmModule.forFeature([Guest])],
  providers: [GuestsService],
  controllers: [GuestsController],
})
export class GuestsModule {}
