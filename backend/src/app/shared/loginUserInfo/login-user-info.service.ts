import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserInfoDto } from '../../utility/dto/user-info.dto';

@Injectable({ scope: Scope.REQUEST })
export class LoginUserInfoService {
    constructor(@Inject(REQUEST) private request: Request) {}

    public getInfo(): UserInfoDto {
        const userInfo = this.request['userInfo'] as UserInfoDto;
        return userInfo;
    }
}
