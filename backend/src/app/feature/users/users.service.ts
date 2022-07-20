import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredential } from '../../utility/dto/authCredential.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) { }

    async validateCredential(authCredential: AuthCredential): Promise<boolean> {
        const isValidate = await this.usersRepository.validateCredential(authCredential);
        return isValidate;
    }
}