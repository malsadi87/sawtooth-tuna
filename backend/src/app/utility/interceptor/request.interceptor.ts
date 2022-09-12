import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { DataSource } from "typeorm";
import { UsersBlockchainInfoEntity } from "../../../entity/usersBlockchainInfo.entity";

@Injectable()
export class RequestInterceptor implements NestInterceptor {
    constructor(
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        let token = request.headers['authorization'];

        if (token) {
            token = token.replace('Bearer', '').trim();
            const decodedData = this.jwtService.decode(token);
            const blockChainInfo = await this.dataSource.getRepository(UsersBlockchainInfoEntity).findOneBy({ userId: decodedData['id'] });
            request.userInfo = {
                userId: decodedData['id'],
                blockChainPublicKey: blockChainInfo.publicKey,
                blockChainPrivateKey: blockChainInfo.privateKey
            }
        }

        return next.handle();
      }
}