import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllGlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let message = '';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const error = exception.name;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = response['message'];
      statusCode = exception.getStatus();
    }

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      data: null,
      error: {
        error,
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message,
      },
      _exception: exception,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
