import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
} from 'fs';
import { dirname, join } from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  constructor() {
    this.addErrorListeners();
  }
  private readonly consoleLogger = new ConsoleLogger();
  private readonly logFile = join(__dirname, '../../logs/common.log');
  private readonly errorLogFile = join(__dirname, '../../logs/errors.log');

  verbose(message: any, context: string) {
    this.consoleLogger.verbose(message, context);
    this.writeLogsToFile('verbose', message, context);
  }

  log(message: any, context: string) {
    this.consoleLogger.log(message, context);
    this.writeLogsToFile('log', message, context);
  }

  warn(message: any, context: string) {
    this.consoleLogger.warn(message, context);
    this.writeLogsToFile('warn', message, context);
  }

  error(message: any, context?: string, trace?: string) {
    this.consoleLogger.error(message, context, trace);
    this.writeLogsToFile('error', message, context, trace);
    this.writeErrorLogsToFile('error', message, context, trace);
  }

  private writeLogsToFile(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const timestamp = new Date().toUTCString();
    const content = `${timestamp} ${level} [${context}] ${message}\n${trace ? `TRACE: ${trace}\n` : ''}`;

    const logDir = dirname(this.logFile);
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    } else if (existsSync(this.logFile)) {
      const fileSize = statSync(this.logFile).size;

      if (fileSize >= +process.env.MAX_LOGS_FILE_SIZE || 10240) {
        const newLogFile = join(
          dirname(this.logFile),
          `common${Date.parse(timestamp)}.log`,
        );
        renameSync(this.logFile, newLogFile);
      }
    }

    appendFileSync(this.logFile, content);
  }

  private writeErrorLogsToFile(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const timestamp = new Date().toUTCString();
    const content = `${timestamp} ${level} [${context}] ${message}\n${trace ? `TRACE: ${trace}\n` : ''}`;

    const errorLogDir = dirname(this.errorLogFile);
    if (!existsSync(errorLogDir)) {
      mkdirSync(errorLogDir, { recursive: true });
    } else if (existsSync(this.errorLogFile)) {
      const fileSize = statSync(this.errorLogFile).size;

      if (fileSize >= +process.env.MAX_LOGS_FILE_SIZE || 10240) {
        const newErrorLogFile = join(
          dirname(this.errorLogFile),
          `error${Date.parse(timestamp)}.log`,
        );
        renameSync(this.errorLogFile, newErrorLogFile);
      }
    }

    appendFileSync(this.errorLogFile, content);
  }

  private addErrorListeners() {
    process.on('uncaughtException', (error: Error) => {
      this.error(`[Uncaught Exception] ${error.message}`, 'APP', error.stack);
      process.exit(1);
    });

    process.on('unhandledRejection', (error: Error) => {
      this.error(`[Unhandled Rejection] ${error.message}`, 'APP', error.stack);
      process.exit(1);
    });
  }
}
