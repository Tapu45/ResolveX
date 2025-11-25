import { ZodError } from "zod";

export enum LogLevel {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

interface LogContext {
    timestamp: string;
    level: LogLevel;
    module: string;
    message: string;
    data?: any;
    error?: any;
    stack?: string;
}

class Logger {
    private module: string;

    constructor(module: string) {
        this.module = module;
    }

    private getTimestamp(): string {
        return new Date().toISOString();
    }

    private formatLog(context: LogContext): string {
        const { timestamp, level, module, message, data, error, stack } = context;
        let log = `[${timestamp}] [${level}] [${module}] ${message}`;

        if (data) {
            log += `\n  Data: ${JSON.stringify(data, null, 2)}`;
        }

        if (error) {
            log += `\n  Error: ${error}`;
        }

        if (stack) {
            log += `\n  Stack: ${stack}`;
        }

        return log;
    }

    private logToConsole(context: LogContext): void {
        const { level, message } = context;
        const formattedLog = this.formatLog(context);

        switch (level) {
            case LogLevel.SUCCESS:
                console.log(`✅ ${formattedLog}`);
                break;
            case LogLevel.ERROR:
                console.error(`❌ ${formattedLog}`);
                break;
            case LogLevel.WARN:
                console.warn(`⚠️ ${formattedLog}`);
                break;
            case LogLevel.DEBUG:
                console.debug(`🔍 ${formattedLog}`);
                break;
            case LogLevel.INFO:
                console.info(`ℹ️ ${formattedLog}`);
                break;
        }
    }

    // ============ INFO ============
    info(message: string, data?: any): void {
        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level: LogLevel.INFO,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    // ============ SUCCESS ============
    success(message: string, data?: any): void {
        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level: LogLevel.SUCCESS,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    // ============ WARNING ============
    warn(message: string, data?: any): void {
        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level: LogLevel.WARN,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    // ============ DEBUG ============
    debug(message: string, data?: any): void {
        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level: LogLevel.DEBUG,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    // ============ ERROR ============
    error(message: string, error?: any, additionalData?: any): void {
        let errorMessage = message;
        let errorStack: string | undefined;

        if (error instanceof Error) {
            errorMessage = `${message}: ${error.message}`;
            errorStack = error.stack;
        } else if (error instanceof ZodError) {
            errorMessage = `${message}: Validation Error`;
            additionalData = {
                ...additionalData,
                validationErrors: error.issues,
            };
        } else if (typeof error === "string") {
            errorMessage = `${message}: ${error}`;
        } else if (error) {
            errorMessage = `${message}: ${JSON.stringify(error)}`;
        }

        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level: LogLevel.ERROR,
            module: this.module,
            message: errorMessage,
            error: error instanceof Error ? error.message : error,
            stack: errorStack,
            data: additionalData,
        };

        this.logToConsole(context);
    }

    // ============ VALIDATION ERROR ============
    validationError(message: string, zodError: ZodError, additionalData?: any): void {
        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level: LogLevel.ERROR,
            module: this.module,
            message: `${message} - Validation Failed`,
            data: {
                ...additionalData,
                validationErrors: zodError.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                    code: issue.code,
                })),
            },
        };

        this.logToConsole(context);
    }

    // ============ REQUEST LOG ============
    logRequest(method: string, path: string, userId?: string): void {
        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level: LogLevel.INFO,
            module: this.module,
            message: `Request: ${method} ${path}`,
            data: { userId },
        };

        this.logToConsole(context);
    }

    // ============ RESPONSE LOG ============
    logResponse(statusCode: number, message: string, data?: any): void {
        const level = statusCode >= 400 ? LogLevel.WARN : LogLevel.SUCCESS;
        const context: LogContext = {
            timestamp: this.getTimestamp(),
            level,
            module: this.module,
            message: `Response: [${statusCode}] ${message}`,
            data,
        };

        this.logToConsole(context);
    }
}

// Factory function to create logger instance
export const createLogger = (module: string): Logger => {
    return new Logger(module);
};

// Export for direct usage
export default Logger;