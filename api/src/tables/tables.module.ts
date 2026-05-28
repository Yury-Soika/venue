import { Module } from '@nestjs/common';
import { CaslModule } from '../casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';

@Module({
  imports: [CaslModule, TypeOrmModule.forFeature([Table])],
  providers: [TablesService],
  controllers: [TablesController],
})
export class TablesModule {}
