import { Injectable } from '@nestjs/common';
import { UsersBlockchainInfoEntity } from '../../../entity/usersBlockchainInfo.entity';
import { UsersBlockchainInfoRepository } from './users-blockchain-info.repository';

@Injectable()
export class UsersBlockchainInfoService {
    constructor(private readonly usersBlockchainInfoRepository: UsersBlockchainInfoRepository) {}

    async addNewKeyToUser(userId: string, publicKey: string, privateKey: string): Promise<string> {
        const newInfo: UsersBlockchainInfoEntity = await this.usersBlockchainInfoRepository.addNewKeyToUser(userId, publicKey, privateKey);
        return newInfo.id;        
    }
}
