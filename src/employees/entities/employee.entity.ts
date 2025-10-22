import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @ManyToMany(() => Company, company => company.employees)
  company?: Company[];
}
