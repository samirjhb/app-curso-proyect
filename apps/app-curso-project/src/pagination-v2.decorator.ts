import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationV2 = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    const paginate = request.paginate;
    return paginate;
  },
);
