import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
const { NODE_ENV } = process.env;

@Catch()
export class ApiExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseObj = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    };

    if (NODE_ENV && (NODE_ENV == 'dev' || NODE_ENV == 'test')) {
      if (exception instanceof HttpException) return super.catch(exception, host);
      else {
        responseObj['error'] = (exception as Error).message;
      }
    }

    response
      .status(status)
      .json(responseObj);
  }
}