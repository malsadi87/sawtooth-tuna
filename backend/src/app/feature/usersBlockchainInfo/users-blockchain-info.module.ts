import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersBlockchainInfoEntity } from '../../../entity/usersBlockchainInfo.entity';
import { UsersBlockchainInfoRepository } from './users-blockchain-info.repository';
import { UsersBlockchainInfoService } from './users-blockchain-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersBlockchainInfoEntity])],
  providers: [UsersBlockchainInfoRepository, UsersBlockchainInfoService],
  exports: [UsersBlockchainInfoService]
})
export class UsersBlockchainInfoModule {}
