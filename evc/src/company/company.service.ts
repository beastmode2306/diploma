import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetCompanyDto } from './dtos/getCompany.dto';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { UpdateCompanyDto } from './dtos/updateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getCompanies(dto: GetCompanyDto) {
    const { id, email } = dto;
    if (id) {
      return this.getCompanyById(id);
    }
    if (email) {
      return this.getCompanyByEmail(email);
    }
    return this.getAll();
  }

  async getAll() {
    return this.prisma.company.findMany();
  }

  async getCompanyById(id: number) {
    return this.prisma.company.findUnique({
      where: { id: id },
    });
  }

  async getCompanyByEmail(email: string) {
    return this.prisma.company.findUnique({
      where: { email: email },
    });
  }

  async createCompany(data: CreateCompanyDto) {
    return this.prisma.company.create({
      data,
    });
  }

  async updateCompany(id: number, data: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id: id },
      data,
    });
  }
}
