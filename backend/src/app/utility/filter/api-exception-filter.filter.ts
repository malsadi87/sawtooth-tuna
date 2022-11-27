import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Catch()
export class ApiExceptionFilter extends BaseExceptionFilter {
  private readonly NODE_ENV: string;

  constructor(config: ConfigService) {
    super();
    this.NODE_ENV = config.get('env.NODE_ENV');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseObj = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: (exception as Error).message
    };

    if (this.NODE_ENV && ['dev', 'test'].includes(this.NODE_ENV) && (exception instanceof HttpException))
        return super.catch(exception, host);

    if (this.NODE_ENV == 'prod' && status == 500)
      responseObj.message = "Something went wrong! please contact the administrator!";

    response
      .status(status)
      .json(responseObj);
  }
}