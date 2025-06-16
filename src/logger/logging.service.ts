import { ConsoleLogger, Injectable, LoggerService } from "@nestjs/common";

@Injectable()
export class LoggingService implements LoggerService {
  private readonly consoleLogger = new ConsoleLogger();

  verbose(message: any, context: string) {
    this.consoleLogger.verbose(message, context);
  }

  log(message: any, context: string) {
    this.consoleLogger.log(message, context);
  }

  warn(message: any, context: string) {
    this.consoleLogger.warn(message, context);
  }

  error(message: any, context: string) {
    this.consoleLogger.error(message, context);
  }
}
