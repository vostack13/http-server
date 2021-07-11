interface IConsole {
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

export class Logger {
  logger: IConsole;

  constructor() {
    this.logger = console;
  }

  error(message?: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }
}
