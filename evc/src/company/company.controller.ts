import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { AllGlobalExceptionsFilter } from '../common/exceptions.filter';
import { GetCompanyDto } from './dtos/getCompany.dto';
import { UpdateCompanyDto } from './dtos/updateCompany.dto';
import { GovernanceKeyGuard } from '../key/guards/governanceKey.guard';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(GovernanceKeyGuard)
  @Get()
  async getCompany(@Query() getCompanyDto: GetCompanyDto) {
    return this.companyService.getCompanies(getCompanyDto);
  }

  @UseGuards(GovernanceKeyGuard)
  @Patch('/:id')
  updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(id, updateCompanyDto);
  }
}
