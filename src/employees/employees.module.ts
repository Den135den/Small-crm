import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employees } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employees, Company])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
