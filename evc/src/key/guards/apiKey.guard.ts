import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { KeyService } from '../key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly keyService: KeyService) {} // made up service for the point of the exmaple

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'] ?? req.query.api_key;

    const { valid, companyId } = await this.keyService.isApiKeyValid(key);

    if (valid) {
      req.companyId = companyId;
      return true;
    }

    return false;
  }
}
