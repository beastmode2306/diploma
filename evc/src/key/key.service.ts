import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, ApiKeyRequest, Company } from '@prisma/client';

import { createHash, randomBytes } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { SubmitApiKeyRequestDto } from './dtos/submitApiKeyRequest.dto';
import { UpdateApiKeyRequestDto } from './dtos/updateApiKeyRequest.dto';
import { CompanyService } from '../company/company.service';
import { CreateApiKeyDto } from './dtos/createApiKey.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class KeyService {
  constructor(
    private prisma: PrismaService,
    private companyService: CompanyService,
    private notificationService: NotificationService,
  ) {}

  async submitApiKeyRequest({
    companyName,
    companyEmail,
    companyCountry,
    message,
  }: SubmitApiKeyRequestDto): Promise<ApiKeyRequest> {
    return this.prisma.apiKeyRequest.create({
      data: {
        company_name: companyName,
        company_email: companyEmail,
        company_country: companyCountry,
        message,
      },
    });
  }

  async updateKeyRequest(id: number, { status }: UpdateApiKeyRequestDto) {
    if (status == 'PENDING') {
      throw new BadRequestException('Cannot set status to PENDING');
    }

    const result = await this.prisma.$transaction(async (prisma) => {
      const apiKeyRequest = (await prisma.apiKeyRequest.findUnique({
        where: { id },
      })) as ApiKeyRequest;

      if (!apiKeyRequest) {
        throw new NotFoundException();
      }

      if (apiKeyRequest.status == 'PENDING' && status == 'APPROVED') {
        await this.onApiKeyApproved(apiKeyRequest);
      }

      return prisma.apiKeyRequest.update({
        where: { id },
        data: { status },
      });
    });

    return result;
  }

  async createApiKey(data: CreateApiKeyDto) {
    return this.prisma.key.create({
      data: {
        key: data.key,
        company: {
          connect: {
            id: data.companyId,
          },
        },
      },
    });
  }

  async onApiKeyApproved(apiKeyRequest: ApiKeyRequest) {
    const company = (await this.companyService.createCompany({
      name: apiKeyRequest.company_name,
      email: apiKeyRequest.company_email,
      country: apiKeyRequest.company_country,
    })) as Company;

    const apiKey = this.generateApiKey(apiKeyRequest);

    const key = await this.createApiKey({
      key: apiKey,
      companyId: company.id,
    });

    await this.notificationService.sendEmail({
      to: apiKeyRequest.company_email,
      subject: 'Your API key has been approved',
      text: `Your API key has been approved. Your API key is ${apiKey}`,
    });

    return {
      company,
      key,
    };
  }

  generateApiKey({ id, company_email, company_name }: ApiKeyRequest) {
    const salt = randomBytes(16).toString('hex');

    return createHash('sha256')
      .update(`${id}${company_email}${company_name}${salt}`)
      .digest('hex');
  }
}
