enum LogLevel {
  VERBOSE = 'VERBO',
  DEBUG = 'DEBUG',
  INFO = 'INFO ',
  WARN = 'WARN ',
  ERROR = 'ERROR',
  FATAL = 'FATAL'
}

enum Colors {
  RESET = '\x1b[0m',
  GRAY = '\x1b[90m',
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[33m',
  WHITE = '\x1b[37m'
}

export default class LOGGER {

  private static LOG_FILE_NAME = '35c3-workshop-planner.log';

  private static gray(text: string): string {
    return Colors.GRAY + text + Colors.RESET;
  }

  private static white(text: string): string {
    return Colors.WHITE + text + Colors.RESET;
  }

  private static yellow(text: string): string {
    return Colors.YELLOW + text + Colors.RESET;
  }

  private static red(text: string): string {
    return Colors.RED + text + Colors.RESET;
  }

  private static green(text: string): string {
    return Colors.GREEN + text + Colors.RESET;
  }

  private static getTimeFormatted(): string {
    return new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');     // delete the dot and everything after
  }

  private static buildLogLine = function(level: LogLevel, message: string): string {
    switch (level) {
      case LogLevel.VERBOSE:
        return LOGGER.gray(`${LOGGER.getTimeFormatted()} -=35c3-workshop-planner=- [${level}]: ${message}`);
      case LogLevel.DEBUG:
        return LOGGER.white(`${LOGGER.getTimeFormatted()} -=35c3-workshop-planner=- [${level}]: ${message}`);
      case LogLevel.INFO:
        return LOGGER.green(`${LOGGER.getTimeFormatted()} -=35c3-workshop-planner=- [${level}]: ${message}`);
      case LogLevel.WARN:
        return LOGGER.yellow(`${LOGGER.getTimeFormatted()} -=35c3-workshop-planner=- [${level}]: ${message}`);
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        return LOGGER.red(`${LOGGER.getTimeFormatted()} -=35c3-workshop-planner=- [${level}]: ${message}`);
      default:
        return LOGGER.red(`${LOGGER.getTimeFormatted()} -=35c3-workshop-planner=- [${level}]: ${message}`);
    }
  };

  public static verbose(message: string): void {
    console.log(LOGGER.buildLogLine(LogLevel.VERBOSE, message));
  }

  public static debug(message: string | Object): void {
    if (typeof message === 'string') {
      const toLog = LOGGER.buildLogLine(LogLevel.DEBUG, message);
      console.log(toLog);
    } else {
      const toLog = LOGGER.buildLogLine(LogLevel.DEBUG, 'Debug Object: ');
      console.log(toLog);
      console.log(JSON.stringify(message));
    }
  }

  public static info(message: string): void {
    console.log(LOGGER.buildLogLine(LogLevel.INFO, message));
  }

  public static warn(message: string): void {
    console.log(LOGGER.buildLogLine(LogLevel.WARN, message));
  }

  public static error(message: string): void {
    console.log(LOGGER.buildLogLine(LogLevel.ERROR, message));
  }

  public static fatal(message: string): void {
    console.log(LOGGER.buildLogLine(LogLevel.FATAL, message));
  }
}
