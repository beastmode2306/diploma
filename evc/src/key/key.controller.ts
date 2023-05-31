import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { KeyService } from './key.service';
import { SubmitApiKeyRequestDto } from './dtos/submitApiKeyRequest.dto';
import { AllGlobalExceptionsFilter } from '../common/exceptions.filter';
import { UpdateApiKeyRequestDto } from './dtos/updateApiKeyRequest.dto';
import { ValidateApiKeyDto } from './dtos/validateApiKey.dto';
import { GetKeyRequestsDto } from './dtos/getKeyRequests.dto';
import { GovernanceKeyGuard } from './guards/governanceKey.guard';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Get('validate')
  async validateKey(@Query() validateApiKeyDto: ValidateApiKeyDto) {
    return this.keyService.isApiKeyValid(validateApiKeyDto.key);
  }

  @Post('submit')
  async submitKeyRequest(
    @Body() submitApiKeyRequestDto: SubmitApiKeyRequestDto,
  ) {
    const { id, company_email } = await this.keyService.submitApiKeyRequest(
      submitApiKeyRequestDto,
    );

    return { id, company_email };
  }

  @UseGuards(GovernanceKeyGuard)
  @Get('requests')
  async getKeyRequests(@Query() apiKeyRequestsDto: GetKeyRequestsDto) {
    return this.keyService.getKeyRequests(apiKeyRequestsDto);
  }

  @UseGuards(GovernanceKeyGuard)
  @Patch('/:id')
  updateKeyRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApiKeyRequestDto: UpdateApiKeyRequestDto,
  ) {
    return this.keyService.updateKeyRequest(id, updateApiKeyRequestDto);
  }
}
