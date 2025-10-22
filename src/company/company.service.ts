import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/service/mail.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    private readonly authService: AuthService,
    private readonly mailService: MailService

  ){}
  async create(createCompanyDto: CreateCompanyDto): Promise<{message: string, company: CreateCompanyDto}>{
    const company = await this.companyRepo.create(createCompanyDto);
    await this.companyRepo.save(company);
    const admin= await this.authService.findAdmin();
    if (!admin) throw new Error('Admin not found');

    const subject = 'Created New Company!';
    const text = `Congrats! Company ${company.name} will be success created. Details (Name: ${company.name}, Email: ${company.email}, Website: ${company.website}).`;
 
    await this.mailService.sendMail(admin.email, subject, text)
    return {message: 'Company create', company: company}
  }

  async findAll(): Promise<CreateCompanyDto[]> {
    const companies = await this.companyRepo.find({ relations: ['employees'] });
    if (!companies.length) throw new NotFoundException('No companies found')

    return companies;
  }

  async findOne(id: number): Promise<CreateCompanyDto> {
    const oneComnpany = await this.companyRepo.findOne({where: {id}, relations: ['employees']})
    if (!oneComnpany) throw new NotFoundException('No companies found');

    return oneComnpany;
  }

  async queryService(query: {search?: string, employee?: number, page?: number, size?: number}) {
    const { search, employee, page, size } = query;
    let result;

    if (search) {
      const searchCompany = ILike(`%${search}%`);
      result = await this.companyRepo.find({ where: {name: searchCompany}, relations:['employees'] });
      if (result.length === 0) throw new NotFoundException('No companies found');
      return result;
    }

    if(employee) {
      result = await this.companyRepo.find({ where: {employees: { id: employee }}, relations:['employees'] });
      if (result.length === 0) throw new NotFoundException('No employees found in company');
      return result;
    }

    if(page && size) {
      const skip = (page - 1) * size;
      result = await this.companyRepo.find({relations: ['employees'],
        skip,
        take: size,
        order: { name: 'ASC' },
      });
      if (result.length === 0) throw new NotFoundException('No employees found in company');

      return result;
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<CreateCompanyDto> {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: ['employees']
    });
    if (!company) throw new NotFoundException('Company not found');

    await this.companyRepo.merge(company, updateCompanyDto);
    return await this.companyRepo.save(company);
  }

  async remove(id: number): Promise<boolean>{
    const company = await this.companyRepo.findOneBy({ id });

    if (!company) throw new NotFoundException('Company not found')
    await this.companyRepo.remove(company);
    return true;

  }
}
