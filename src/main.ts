import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { LoggingService } from './logger/logging.service';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { ExceptionsFilter } from './utils/exception.filter';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggingService);
  app.useLogger(logger);

  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  const adapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(logger, adapter));

  // setTimeout(() => {
  //   throw new Error('Something went wrong');
  // }, 2000);

  await app.listen(port);
}
bootstrap();
