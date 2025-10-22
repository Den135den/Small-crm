import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import * as sharp from 'sharp';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiParam, ApiQuery } from '@nestjs/swagger';
import { deleteCompanyParamsSwagger, deleteCompanyResponseSwagger, 
  getCompanyAllResponseSwagger, getCompanyOneParamsSwagger, getCompanyOneResponseSwagger, 
  patchCompanyBodySwagger, patchCompanyParamsSwagger, patchCompanyResponseSwagger, postCompanyBodySwagger, 
  postCompanyResponseSwagger } from './swagger/company.swagger';

@ApiTags('Company')
@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBody(postCompanyBodySwagger)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create new company with optional logo' })
  @ApiResponse(postCompanyResponseSwagger)
  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(@Body() createCompanyDto: CreateCompanyDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const metadata = await sharp(file.path).metadata();
      if (metadata.width < 100 || metadata.height < 100) {
        throw new BadRequestException('Logo must be at least 100x100 pixels');
      }
      createCompanyDto.logo = file.path;
    }

    return this.companyService.create(createCompanyDto);
  }

  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse(getCompanyAllResponseSwagger)
  @Get('all')
  findAll() {
    return this.companyService.findAll();
  }

  @ApiOperation({ summary: 'Get company by ID' })
  @ApiParam(getCompanyOneParamsSwagger)
  @ApiResponse(getCompanyOneResponseSwagger)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @ApiOperation({ summary: 'Query companies with search, employee, pagination' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'employee', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @Get()
  queryFind(@Query('search') search: string, @Query('employee') employee?: number, @Query('page') page?: number, @Query('size') size?: number) {
    return this.companyService.queryService({ search, employee, page, size });
  }

  @ApiOperation({ summary: 'Update company by ID' })
  @ApiParam(patchCompanyParamsSwagger)
  @ApiBody(patchCompanyBodySwagger)
  @ApiResponse(patchCompanyResponseSwagger)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @ApiOperation({ summary: 'Delete company by ID' })
  @ApiParam(deleteCompanyParamsSwagger)
  @ApiResponse(deleteCompanyResponseSwagger)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
