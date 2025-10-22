import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../role/role';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
