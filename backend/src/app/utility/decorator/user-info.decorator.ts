import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserInfo = createParamDecorator (
    (data: string = null, ctx: ExecutionContext) => {
        const userInfo = ctx.switchToHttp().getRequest().userInfo;
        return data ? userInfo?.[data] : userInfo;
    }
)