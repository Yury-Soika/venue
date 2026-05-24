import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type EventStatus = 'upcoming' | 'live' | 'sold-out' | 'completed' | 'cancelled';

@Entity('events')
export class VenueEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  dj: string;

  @Column({ default: 0 })
  ticketsSold: number;

  @Column()
  ticketsTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  revenue: number;

  @Column({ default: 'upcoming' })
  status: EventStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  coverCharge: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
