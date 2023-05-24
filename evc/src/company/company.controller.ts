import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { AllGlobalExceptionsFilter } from '../common/exceptions.filter';
import { GetCompanyDto } from './dtos/getCompany.dto';
import { UpdateCompanyDto } from './dtos/updateCompany.dto';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompany(@Query() getCompanyDto: GetCompanyDto) {
    return this.companyService.getCompanies(getCompanyDto);
  }

  @Patch('/:id')
  updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(id, updateCompanyDto);
  }
}
