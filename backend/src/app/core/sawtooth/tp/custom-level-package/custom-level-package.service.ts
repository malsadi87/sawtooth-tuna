import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';
import { CustomPackageCreationDto } from '../../../../utility/dto/tp/custom-package-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CustomLevelPackageRepository } from './custom-level-package.repository';

@Injectable()
export class CustomLevelPackageService {
    private readonly entityName: string;
    constructor(
        private readonly customLevelPackageRepository: CustomLevelPackageRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'custom-package';
    }

    async getAll(): Promise<CustomLevelPackageEntity[]> {
        return await this.customLevelPackageRepository.getAll();
    }

    async getByConsumerPackageId(consumerPackageId: string): Promise<CustomLevelPackageEntity> {
        const result = await this.customLevelPackageRepository.getByConsumerPackageId(consumerPackageId);
        if (!result)
            throw new NotFoundException('Consumer Package Not Found!');
        return result;
    }

    async addNewPackage(customPackagePayload: CustomPackageCreationDto): Promise<string> {
        const customPackage = plainToClass(CustomLevelPackageEntity, customPackagePayload);
        const oldCustomPackage = await this.customLevelPackageRepository.getByConsumerPackageId(customPackage.consumerPackageId);

        if (oldCustomPackage) throw new BadRequestException(`Custom Package with Id - ${customPackage.consumerPackageId}, Already Exist!`);

        const newCustomPackage = await this.customLevelPackageRepository.addNewPackage(customPackage);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newCustomPackage, this.entityName);

        return newCustomPackage.consumerPackageId;
    }
}
