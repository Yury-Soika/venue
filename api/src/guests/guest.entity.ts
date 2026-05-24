import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type GuestTier = 'vip' | 'regular' | 'blacklist';

@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 'regular' })
  tier: GuestTier;

  @Column({ default: 0 })
  visits: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalSpend: number;

  @Column({ nullable: true })
  lastVisit: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
