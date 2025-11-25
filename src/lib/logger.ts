import { ZodError } from "zod";

export enum LogLevel {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

interface LogContext<T = unknown, E = unknown> {
    timestamp: string;
    level: LogLevel;
    module: string;
    message: string;
    data?: T;
    error?: E;
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
    info<T = unknown>(message: string, data?: T): void {
        const context: LogContext<T> = {
            timestamp: this.getTimestamp(),
            level: LogLevel.INFO,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    success<T = unknown>(message: string, data?: T): void {
        const context: LogContext<T> = {
            timestamp: this.getTimestamp(),
            level: LogLevel.SUCCESS,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    warn<T = unknown>(message: string, data?: T): void {
        const context: LogContext<T> = {
            timestamp: this.getTimestamp(),
            level: LogLevel.WARN,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    debug<T = unknown>(message: string, data?: T): void {
        const context: LogContext<T> = {
            timestamp: this.getTimestamp(),
            level: LogLevel.DEBUG,
            module: this.module,
            message,
            data,
        };
        this.logToConsole(context);
    }

    error<E = Error | ZodError | string | object, T = unknown>(message: string, error?: E, additionalData?: T): void {
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
            } as T;
        } else if (typeof error === "string") {
            errorMessage = `${message}: ${error}`;
        } else if (error) {
            errorMessage = `${message}: ${JSON.stringify(error)}`;
        }

        const context: LogContext<T, E> = {
            timestamp: this.getTimestamp(),
            level: LogLevel.ERROR,
            module: this.module,
            message: errorMessage,
            error: error,
            stack: errorStack,
            data: additionalData,
        };

        this.logToConsole(context);
    }

    validationError<T = unknown>(message: string, zodError: ZodError, additionalData?: T): void {
        const context: LogContext<T> = {
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
            } as T,
        };

        this.logToConsole(context);
    }

    logRequest(method: string, path: string, userId?: string): void {
        const context: LogContext<{ userId?: string }> = {
            timestamp: this.getTimestamp(),
            level: LogLevel.INFO,
            module: this.module,
            message: `Request: ${method} ${path}`,
            data: { userId },
        };

        this.logToConsole(context);
    }

    logResponse<T = unknown>(statusCode: number, message: string, data?: T): void {
        const level = statusCode >= 400 ? LogLevel.WARN : LogLevel.SUCCESS;
        const context: LogContext<T> = {
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