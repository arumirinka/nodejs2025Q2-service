import { ConsoleLogger, Injectable, LoggerService, LogLevel } from "@nestjs/common";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";

@Injectable()
export class LoggingService implements LoggerService {
  private readonly consoleLogger = new ConsoleLogger();
  private readonly logFile = join(__dirname, '../../logs/common.log');

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
  }

  private writeLogsToFile(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const timestamp = new Date().toISOString();
    const content = `${timestamp} ${level} [${context}] ${message}\n${trace ? `TRACE: ${trace}\n` : ''}`;

    const logDir = dirname(this.logFile);
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    appendFileSync(this.logFile, content);
  }
}
