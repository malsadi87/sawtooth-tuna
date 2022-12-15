import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CatchEntity } from '../../../../../entity/catch.entity';
import { CatchCreationDto } from '../../../../utility/dto/tp/catch-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { PalletService } from '../pallet/pallet.service';
import { CatchRepository } from './catch.repository';

@Injectable()
export class CatchService {
    private readonly familyName: string;
    constructor(
        private readonly catchRepository: CatchRepository,
        private readonly palletService: PalletService,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.familyName = 'catch';
    }

    async getAll(): Promise<CatchEntity[]> {
        return await this.catchRepository.getAll();
    }

    async getById(id: number): Promise<CatchEntity> {
        const result = await this.catchRepository.getById(id);
        if (!result)
            throw new NotFoundException('Catch not found!');
        return result;
    }

    async addNewCatch(catchPayload: CatchCreationDto): Promise<number> {
        try {
            const catchObject = plainToClass(CatchEntity, catchPayload);
            const newCatch = await this.catchRepository.addNewCatch(catchObject);
    
            // Save in Sawtooth
            await this.sawtoothUtilityService.createAsset(newCatch, this.familyName);
    
            return newCatch.pkCatch;
        } catch(e) {
            if (e instanceof NotFoundException)
                throw new BadRequestException(`A Pallet has to created first before adding Catch!`);
            throw e;
        }
    }
}
