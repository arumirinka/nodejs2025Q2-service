import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const res = httpContext.getResponse();
    return next.handle().pipe(
      tap((data) => {
        this.logger.log(
          `Request URL: ${JSON.stringify(req.url)}; Query: ${JSON.stringify(req.query)}; Body: ${JSON.stringify(req.body)}`,
          'APP',
        );
        this.logger.log(
          `Response Code: ${JSON.stringify(res.statusCode)}; Data: ${JSON.stringify(data)}`,
          'APP',
        );
      }),
    );
  }
}
