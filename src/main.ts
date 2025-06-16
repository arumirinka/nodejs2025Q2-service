import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { LoggingService } from './logger/logging.service';
import { LoggingInterceptor } from './logger/logging.interceptor';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggingService);
  app.useLogger(logger);

  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  await app.listen(port);
}
bootstrap();
