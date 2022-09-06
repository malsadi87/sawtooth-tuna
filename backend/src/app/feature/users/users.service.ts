import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../../entity/users.entity';
import { AuthCredential } from '../../utility/dto/authCredential.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) { }

    async validateCredential(authCredential: AuthCredential): Promise<boolean> {
        const isValidate = await this.usersRepository.validateCredential(authCredential);
        return isValidate;
    }

    async getUserByEmail(email: string): Promise<UsersEntity> {
        return await this.usersRepository.getUserByEmail(email);
    }
}