import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/service/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AuthModule], 
  controllers: [CompanyController],
  providers: [CompanyService, MailService],
})
export class CompanyModule {}
