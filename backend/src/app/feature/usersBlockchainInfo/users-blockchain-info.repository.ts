import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersBlockchainInfoEntity } from '../../../entity/usersBlockchainInfo.entity';

@Injectable()
export class UsersBlockchainInfoRepository extends Repository<UsersBlockchainInfoEntity> {
    constructor(private dataSource: DataSource) {
        super(UsersBlockchainInfoEntity, dataSource.createEntityManager());
    }

    async addNewKeyToUser(userId: string, publicKey: string, privateKey: string): Promise<UsersBlockchainInfoEntity> {
        const info: UsersBlockchainInfoEntity = new UsersBlockchainInfoEntity();
        info.UserId = userId;
        info.PublicKey = publicKey;
        info.PrivateKey = privateKey;
        info.createdDate = new Date();
        info.createdBy = userId;
        info.updatedDate = new Date();
        info.isActive = true;

        await info.save();
        return info;
    }
}
