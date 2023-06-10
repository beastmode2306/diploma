import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  async sendEmail(mail: any & { type: 'order' | 'apiKey'; data: any }) {
    mail = {
      ...mail,
      from: this.configService.get('SENDGRID_FROM'),
    };

    if (mail.type === 'order') {
      mail = {
        ...mail,
        templateId: 'd-ba5d8c43b8124d9f80efd677a8dcba84',
        dynamicTemplateData: {
          ...mail.data,
        },
      };
    } else if (mail.type === 'apiKey') {
      mail = {
        ...mail,
        templateId: 'd-849e30f55125452b97493672a3db8a4a',
        dynamicTemplateData: {
          ...mail.data,
        },
      };
    }

    return SendGrid.send(mail);
  }
}
