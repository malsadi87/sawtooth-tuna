import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { DataSource } from "typeorm";
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class LoginUserInfoService {
    constructor(
        @Inject(REQUEST) private request: Request,
        private dataSource: DataSource
    ) {}

    public async getUserBlockChainInfo(): Promise<{ publicKey: string, privateKey: string }> {
        const data = this.request.headers;
        return null;
    }
}