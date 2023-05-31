import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GovernanceKeyGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'] ?? req.query.api_key;

    const governanceKey = process.env.GOVERNANCE_API_KEY;

    return key === governanceKey;
  }
}
