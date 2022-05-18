import { Injectable, ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RequestPayloadValidationPipe extends ValidationPipe {

  exceptionFactory: any;
  constructor() {
    super();
    this.exceptionFactory = this.createExceptionFactory();  
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type.includes('body')) {
        const object = plainToClass(metadata.metatype, value);
        const errors: any = await validate(object);
        if (errors.length > 0) {
          throw this.exceptionFactory(errors);
        }
        return object;
    }

    return super.transform(value, metadata);
  }
}