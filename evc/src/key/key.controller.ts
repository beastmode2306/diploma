import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { KeyService } from './key.service';
import { SubmitApiKeyRequestDto } from './dtos/submitApiKeyRequest.dto';
import { AllGlobalExceptionsFilter } from '../common/exceptions.filter';
import { UpdateApiKeyRequestDto } from './dtos/updateApiKeyRequest.dto';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Post('submit')
  async submitKeyRequest(
    @Body() submitApiKeyRequestDto: SubmitApiKeyRequestDto,
  ) {
    const { id, company_email } = await this.keyService.submitApiKeyRequest(
      submitApiKeyRequestDto,
    );

    return { id, company_email };
  }

  @Patch('/:id')
  updateKeyRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApiKeyRequestDto: UpdateApiKeyRequestDto,
  ) {
    return this.keyService.updateKeyRequest(id, updateApiKeyRequestDto);
  }
}
