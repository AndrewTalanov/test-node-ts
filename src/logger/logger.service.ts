import { injectable } from "inversify";
import { Logger, ISettingsParam } from "tslog";
import { ILogger } from "./logger.interface";
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
    private logger: Logger<unknown>;

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false
        } as ISettingsParam<unknown>);
    }

    public log(...args: unknown[]) {
        this.logger.info(...args);
    }

    public error(...args: unknown[]) {
        this.logger.error(...args);
    }

    public warn(...args: unknown[]) {
        this.logger.warn(...args);
    }

}