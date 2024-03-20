import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RawBody = createParamDecorator((_data: unknown, ctx: ExecutionContext): any => {
  const request = ctx.switchToHttp().getRequest();
  return request.body;
});
