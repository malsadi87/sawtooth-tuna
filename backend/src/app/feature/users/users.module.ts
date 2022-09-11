import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../../entity/users.entity';
import { UsersBlockchainInfoModule } from '../usersBlockchainInfo/users-blockchain-info.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]), 
    UsersBlockchainInfoModule
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule { }