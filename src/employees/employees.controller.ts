import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { deleteEmployeeParamsSwagger, deleteEmployeeResponseSwagger, getEmployeeAllResponseSwagger, getEmployeeOneParamsSwagger, patchEmployeeBodySwagger, patchEmployeeParamsSwagger, patchEmployeeResponseSwagger, postEmployeeBodySwagger } from './swagger/employee.swagger';
import { getCompanyOneResponseSwagger } from 'src/company/swagger/company.swagger';


@ApiTags('Employees')
@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiBody(postEmployeeBodySwagger)
  @ApiOperation({ summary: 'Create new company with optional logo' })
  @ApiResponse(postEmployeeBodySwagger)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Get all empolyees' })
  @ApiResponse(getEmployeeAllResponseSwagger)
  @Get('all')
  findAll() {
    return this.employeesService.findAll();
  }

  @ApiOperation({ summary: 'Get employees by ID' })
  @ApiParam(getEmployeeOneParamsSwagger)
  @ApiResponse(getCompanyOneResponseSwagger)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Query companies with search, employee, pagination' })
  @ApiQuery({ name: 'firsName', required: false, type: String })
  @ApiQuery({ name: 'lastName', required: false, type: String })
  @ApiQuery({ name: 'nameCompany', required: false, type: String })
  @ApiQuery({ name: 'companyId', required: false, type: Number })
  @ApiQuery({ name: 'lastName', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @Get()
    queryFind(
      @Query('firsName') firsName?: string, 
      @Query('lastName') lastName?: string,
      @Query('nameCompany') nameCompany?: string,
      @Query('companyId') companyId?: number,
      @Query('page') page?: number,
      @Query('size') size?: number,
    ) {
 
      return this.employeesService.queryService({firsName, lastName, nameCompany, companyId, page, size});
    }

  @ApiOperation({ summary: 'Update employee by ID' })
  @ApiParam(patchEmployeeParamsSwagger)
  @ApiBody(patchEmployeeBodySwagger)
  @ApiResponse(patchEmployeeResponseSwagger)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Delete employee by ID' })
  @ApiParam(deleteEmployeeParamsSwagger)
  @ApiResponse(deleteEmployeeResponseSwagger)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
