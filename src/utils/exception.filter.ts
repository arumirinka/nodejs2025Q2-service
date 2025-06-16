import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from 'src/logger/logging.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService, private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const resBody = {
      statusCode: status,
      method: ctx.getRequest().method,
      url: this.httpAdapterHost.httpAdapter.getRequestUrl(ctx.getRequest),
      timestamp: new Date().toISOString(),
    };

    const { stack } = exception as Error;

    this.logger.error(`Exception ${resBody}`, 'APP', stack);

    this.httpAdapterHost.httpAdapter.reply(ctx.getResponse(), resBody, status);
  }
}
