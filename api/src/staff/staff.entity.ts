import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type StaffRole = 'manager' | 'bartender' | 'host' | 'security' | 'dj' | 'promoter';
export type StaffStatus = 'active' | 'off-duty' | 'on-leave';

@Entity('staff')
export class StaffMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  role: StaffRole;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 0 })
  shiftsThisMonth: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 5.0 })
  rating: number;

  @Column({ default: 'active' })
  status: StaffStatus;

  @Column({ nullable: true })
  hiredDate: string;

  @CreateDateColumn()
  createdAt: Date;
}
