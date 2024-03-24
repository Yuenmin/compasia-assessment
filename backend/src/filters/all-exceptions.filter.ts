import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message: string | object;
    let statusCode: HttpStatus;

    if (exception instanceof HttpException) {
      message = exception.message;
      statusCode = exception.getStatus();
    } else {
      message = "Internal Server Error";
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (statusCode >= 500)
      logException(
        request,
        exception.stack ?? JSON.stringify(exception),
        statusCode
      );
    else if (statusCode >= 400) logException(request, exception, statusCode);
    response.status(statusCode).json(
      process.env.TYPE === "DEV"
        ? {
            statusCode,
            error: HttpStatus[statusCode],
            timestamp: new Date().toISOString(),
            method: request.method,
            message,
          }
        : {
            statusCode,
            message,
          }
    );
  }
}

const logException = (
  request: Request,
  infoToLog: string,
  statusCode: HttpStatus,
  loggerName?: string
) => {
  const logger = new Logger(loggerName ?? "ExceptionFilter");
  const log = `${HttpStatus[statusCode]} {${request.url}, ${request.method}} route\n${infoToLog}`;
  if (statusCode >= 500) logger.error(log);
  else if (statusCode >= 400) logger.warn(log);
};
