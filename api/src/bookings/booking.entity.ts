import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'seated' | 'completed';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guestName: string;

  @Column({ nullable: true })
  guestEmail: string;

  @Column()
  table: string;

  @Column()
  partySize: number;

  @Column()
  time: string;

  @Column()
  date: string;

  @Column({ default: 'pending' })
  status: BookingStatus;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalSpend: number;

  @CreateDateColumn()
  createdAt: Date;
}
