import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  async sendEmail(mail: any) {
    mail = {
      ...mail,
      from: this.configService.get('SENDGRID_FROM'),
    };

    return SendGrid.send(mail);
  }
}
