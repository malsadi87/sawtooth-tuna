import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { CustomPackageCreationDto } from '../../../../utility/dto/tp/custom-package-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CustomLevelPackageRepository } from './custom-level-package.repository';

@Injectable()
export class CustomLevelPackageService {
    private readonly familyName;
    constructor(
        private readonly customLevelPackageRepository: CustomLevelPackageRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) {
        this.familyName = '';
    }

    async getAll(): Promise<CustomLevelPackageEntity[]> {
        return await this.customLevelPackageRepository.getAll();
    }

    async getByConsumerPackageId(consumerPackageId: string): Promise<CustomLevelPackageEntity> {
        return await this.customLevelPackageRepository.getByConsumerPackageId(consumerPackageId);
    }

    async addNewPackage(customPackagePayload: CustomPackageCreationDto): Promise<string> {
        const customPackage = plainToClass(CustomLevelPackageEntity, customPackagePayload);
        return await this.customLevelPackageRepository.addNewPackage(customPackage);
    }
}
