import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './entities/employee.entity';
import { Company } from 'src/company/entities/company.entity';
import { ILike, In, Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeesRepo: Repository<Employees>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ){}
  
  async create(dto: CreateEmployeeDto): Promise<CreateEmployeeDto>{
    const employee = this.employeesRepo.create(dto);

    if (dto.companyIds && dto.companyIds.length) {
      const companies = await this.companyRepo.find({
        where: { id: In(dto.companyIds) }
      });
      employee.company = companies;
    }
    return await this.employeesRepo.save(employee);
  }

  async findAll(): Promise<CreateEmployeeDto[]>{
    const allEmployees = await this.employeesRepo.find({relations: ['company']});

    if (!allEmployees.length) throw new NotFoundException('No employee found');
    return allEmployees;
  }

  async findOne(id: number): Promise<CreateEmployeeDto>{
    const oneEmployee = await this.employeesRepo.findOne({ where: {id},relations: ['company']});
    if (!oneEmployee) throw new NotFoundException('No employee found');
    return oneEmployee;
  }

  async queryService(query: {firsName?: string, lastName?: string, nameCompany?: string, 
    companyId?: number, page?: number, size?: number}) {
    const {firsName, lastName, nameCompany, companyId, page, size} = query;
    let result;

    if(firsName || lastName || nameCompany){
      const searchfirsName = ILike(`%${firsName}%`);
      const searchlastName = ILike(`%${lastName}%`);
      const searchCompanyName = ILike(`%${nameCompany}%`);
      result = await this.employeesRepo.find({ 
        where: [
          {firstName: searchfirsName},
          {lastName: searchlastName},
          {company: {name: searchCompanyName}}
        ], 
        relations:['company'] });
      if (!result.length) throw new NotFoundException('No employee found')
      return result;
    }

    if(companyId) {
      result = await this.employeesRepo.find({ 
        where: {company: { id: companyId }}, 
        relations: ['company'] 
      });
      if (result.length === 0) throw new NotFoundException('No employees found in company');
      return result;
    }

    if(page && size) {
      const skip = (page - 1) * size;
      result = await this.employeesRepo.find({relations: ['company'],
        skip,
        take: size,
        order: { firstName: 'ASC' },
      });
      if (result.length === 0) throw new NotFoundException('No employees found in company');

      return result;
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<CreateEmployeeDto>{
   const employee = await this.employeesRepo.findOne({
      where: { id },
      relations: ['company']
    });
    if (!employee) throw new NotFoundException('Company not found');

    await this.employeesRepo.merge(employee, updateEmployeeDto);
    return await this.employeesRepo.save(employee);
  }

  async remove(id: number): Promise<boolean>{
    const employee = await this.employeesRepo.findOneBy({ id });

    if (!employee) throw new NotFoundException('Company not found')
    await this.employeesRepo.remove(employee);
    return true;

  }
}
