import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';
import { CatchPackageCreationDto } from '../../../../utility/dto/tp/catch-package-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CatchPackageRepository } from './catch-package.repository';

@Injectable()
export class CatchPackageService {
    private readonly familyName: string;
    constructor(
        private readonly catchPackageRepository: CatchPackageRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.familyName = 'catch-package';
    }

    async getAll(): Promise<CatchPackageEntity[]> {
        return await this.catchPackageRepository.getAll();
    }

    async getById(id: string): Promise<CatchPackageEntity> {
        const result = await this.catchPackageRepository.getById(id);
        if (!result)
            throw new NotFoundException('Catch Package not found!');
        return result;
    }

    async addNewCatchPackage(catchPackagePayload: CatchPackageCreationDto): Promise<string> {
        const catchPackage = plainToClass(CatchPackageEntity, catchPackagePayload);
        const oldCatchPackage = await this.catchPackageRepository.getById(catchPackage.catchPackageId);

        if (oldCatchPackage) throw new BadRequestException('Catch Package already exist');

        const newCatchPackage = await this.catchPackageRepository.addNewCatchPackage(catchPackage);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newCatchPackage, this.familyName);

        return newCatchPackage.catchPackageId;
    }
}
