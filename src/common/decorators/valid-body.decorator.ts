import { ValidationPipe } from '@nestjs/common';
import { RawBody } from './raw-body.decorator';

/**
 * Custom decorator which include validation pipe and returns 401 status code
 * @returns Decorator
 */
export const ValidBody = () =>
  RawBody(
    new ValidationPipe({
      validateCustomDecorators: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: 401,
    }),
  );
