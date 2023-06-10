import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  ApiKeyRequest,
  Company,
  ApiKeyRequestStatus,
  KeyStatus,
} from '@prisma/client';

import { createHash, randomBytes } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { SubmitApiKeyRequestDto } from './dtos/submitApiKeyRequest.dto';
import { UpdateApiKeyRequestDto } from './dtos/updateApiKeyRequest.dto';
import { CompanyService } from '../company/company.service';
import { CreateApiKeyDto } from './dtos/createApiKey.dto';
import { NotificationService } from '../notification/notification.service';
import { GetKeyRequestsDto } from './dtos/getKeyRequests.dto';

@Injectable()
export class KeyService {
  constructor(
    private prisma: PrismaService,
    private companyService: CompanyService,
    private notificationService: NotificationService,
  ) {}

  async getKeyRequests({
    status,
  }: GetKeyRequestsDto): Promise<ApiKeyRequest[]> {
    const where: Prisma.ApiKeyRequestWhereInput = {};

    if (status) {
      where.status = status;
    }

    return this.prisma.apiKeyRequest.findMany({
      where,
    });
  }

  async submitApiKeyRequest({
    companyName,
    companyEmail,
    companyCountry,
    message,
  }: SubmitApiKeyRequestDto): Promise<ApiKeyRequest> {
    const existingRequest = await this.prisma.apiKeyRequest.findFirst({
      where: {
        company_email: companyEmail,
        company_country: companyCountry,
        status: {
          not: ApiKeyRequestStatus.DECLINED,
        },
      },
    });

    if (existingRequest) {
      throw new BadRequestException(
        'There is already a pending request for this email',
      );
    }

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
      type: 'apiKey',
      data: {
        api_key: apiKey,
      },
    });

    return {
      company,
      key,
    };
  }

  async isApiKeyValid(
    apiKey: string,
  ): Promise<{ valid: boolean; companyId: number | null }> {
    if (!apiKey) {
      return { valid: false, companyId: null };
    }

    const key = await this.prisma.key.findFirst({
      where: {
        key: apiKey,
        status: KeyStatus.ACTIVE,
      },
      include: {
        company: {
          select: {
            id: true,
          },
        },
      },
    });

    return {
      valid: !!key,
      companyId: key ? key.company.id : null,
    };
  }

  generateApiKey({ id, company_email, company_name }: ApiKeyRequest) {
    const salt = randomBytes(16).toString('hex');

    return createHash('sha256')
      .update(`${id}${company_email}${company_name}${salt}`)
      .digest('hex');
  }
}
