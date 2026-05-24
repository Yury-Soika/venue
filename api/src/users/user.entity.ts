import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type UserRole = 'owner' | 'manager' | 'staff';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'manager' })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
}
