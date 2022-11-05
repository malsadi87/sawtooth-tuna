import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';
import { CatchPackageCreationDto } from '../../../../utility/dto/tp/catch-package-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { PalletService } from '../pallet/pallet.service';
import { CatchPackageRepository } from './catch-package.repository';

@Injectable()
export class CatchPackageService {
    private readonly entityName: string;
    constructor(
        private readonly catchPackageRepository: CatchPackageRepository,
        private readonly palletService: PalletService,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'catch-package';
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
        try {
            const catchPackage = plainToClass(CatchPackageEntity, catchPackagePayload);
            const pallet = await this.palletService.getByPalletNo(catchPackage.palletNum);
    
            const oldCatchPackage = await this.catchPackageRepository.getById(catchPackage.catchPackageId);
            if (oldCatchPackage) throw new BadRequestException('Catch Package already exist');
    
            const newCatchPackage = await this.catchPackageRepository.addNewCatchPackage(catchPackage);
    
            // Save in Sawtooth
            await this.sawtoothUtilityService.createAsset(newCatchPackage, this.entityName);
    
            return newCatchPackage.catchPackageId;
        } catch(e) {
            if (e instanceof NotFoundException)
                throw new BadRequestException(`A Pallet has to created first before adding Catch Package!`);
            throw e;
        }
    }

    async verifyData(id: string): Promise<boolean> {
        /**
         * Get the whole entity from DB
         * As, Entity cound change between time, by another client
         * And, getting the whole entity from Frontend, is not safe
         */
         const result = await this.catchPackageRepository.getById(id);
        if (!result) throw new NotFoundException(`Catch Package with ID - ${id} not found!`);

        return this.sawtoothUtilityService.verifyAsset(result, this.entityName);
    }
}
