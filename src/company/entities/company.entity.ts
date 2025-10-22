import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employees } from "src/employees/entities/employee.entity";

@Entity('company')
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    logo?: string;

    @Column({ nullable: true })
    website?: string;

    @ManyToMany(() => Employees, employee => employee.company)
    @JoinTable()
    employees?: Employees[];

}
