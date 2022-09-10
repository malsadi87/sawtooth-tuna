import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';
import { CatchPackageCreationDto } from '../../../../utility/dto/tp/catch-package-creation.dto';
import { CatchPackageRepository } from './catch-package.repository';

@Injectable()
export class CatchPackageService {
    constructor(private readonly catchPackageRepository: CatchPackageRepository) {}

    async getAll(): Promise<CatchPackageEntity[]> {
        return await this.catchPackageRepository.getAll();
    }

    async getById(id: string): Promise<CatchPackageEntity> {
        return await this.catchPackageRepository.getById(id);
    }

    async addNewCatchPackage(catchPackagePayload: CatchPackageCreationDto): Promise<string> {
        const catchPackage = plainToClass(CatchPackageEntity, catchPackagePayload);
        return await this.catchPackageRepository.addNewCatchPackage(catchPackage);
    }
}
