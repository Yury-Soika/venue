import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type TableSection = 'vip' | 'main' | 'bar' | 'terrace';
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  number: string;

  @Column()
  capacity: number;

  @Column()
  section: TableSection;

  @Column({ default: 'available' })
  status: TableStatus;
}
