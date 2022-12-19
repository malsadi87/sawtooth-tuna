import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ConsumerPackageEntity } from '../../../../../entity/consumerPackage.entity';
import { ConsumerPackageCreationDto } from '../../../../utility/dto/tp/consumer-package-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CustomLevelPackageRepository } from './consumer-package.repository';
import { CatchService } from '../catch/catch.service';
import { CatchEntity } from 'src/entity/catch.entity';
import { PalletService } from '../pallet/pallet.service';
import { HaulService } from '../haul/haul.service';
import { CompanyService } from '../company/company.service';
import { PalletEventService } from '../pallet-event/pallet-event.service';
import { ProductService } from '../product/product.service';
import { SpeciesService } from '../species/species.service';
import { TripService } from '../trip/trip.service';
import { PalletEntity } from 'src/entity/pallet.entity';
import { PalletEventEntity } from 'src/entity/palletEvent.entity';
import { TripEntity } from 'src/entity/trip.entity';
import { CompanyEntity } from 'src/entity/company.entity';
import { SpeciesEntity } from 'src/entity/species.entity';
import { ProductEntity } from 'src/entity/product.entity';
import { HaulEntity } from 'src/entity/haul.entity';

@Injectable()
export class CustomLevelPackageService {
    private readonly entityName: string;
    constructor(
        private readonly customLevelPackageRepository: CustomLevelPackageRepository,
        private readonly palletService: PalletService,
        private readonly haulService: HaulService,
        private readonly catchService: CatchService,
        private readonly companyService: CompanyService,
        private readonly palletEventService: PalletEventService,
        private readonly productService: ProductService,
        private readonly speciesService: SpeciesService,
        private readonly tripService: TripService,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'custom-package';
    }

    async getAll(): Promise<ConsumerPackageEntity[]> {
        return await this.customLevelPackageRepository.getAll();
    }

    async getByPkConsumerPackage(pkConsumerPackage: number): Promise<ConsumerPackageEntity> {
        const result = await this.customLevelPackageRepository.getByPkConsumerPackage(pkConsumerPackage);
        if (!result)
            throw new NotFoundException('Consumer Package Not Found!');
        return result;
    }

    async addNewPackage(consumerPackagePayload: ConsumerPackageCreationDto): Promise<number> {
        const consumerPackage = plainToClass(ConsumerPackageEntity, consumerPackagePayload);

        const newConsumerPackage = await this.customLevelPackageRepository.addNewPackage(consumerPackage);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newConsumerPackage, this.entityName);

        return newConsumerPackage.pkConsumerPackage;
    }

    /*
    async getData(pkConsumerPackage: string): Promise<{
      customLevelPackage: ConsumerPackageEntity, 
      catchObject: CatchEntity,
      pallet: PalletEntity,
      palletEvent: PalletEventEntity[],
      trip: TripEntity,
      company: CompanyEntity,
      species: SpeciesEntity,
      product: ProductEntity,
      haul: HaulEntity[]
    }> {
        
        const customLevelPackage = await this.customLevelPackageRepository. getByPkConsumerPackage(pkConsumerPackage);
        const catchObject = await this.catchService.getById(customLevelPackage.fkPallet)
        const pallet = await this.palletService.getByPkPallet(catchObject.pkPallet)
        const palletEvent = await this.palletEventService.getByPkPallet(catchObject.pkPallet)
        const trip = await this.tripService.getByPkTrip(pallet.pkTrip)
        const company = await this.companyService.getById(customLevelPackage.agent)
        const product = await this.productService.getByPalletId(pallet.palletId)
        const haul = await this.haulService.getByPkTrip(pallet.pkTrip)
        const species = null // TODO: getSpecies

        return {
          customLevelPackage: customLevelPackage,
          catchObject: catchObject,
          pallet: pallet,
          palletEvent: palletEvent,
          trip: trip,
          company: company,
          species: species,
          product: product,
          haul: haul
        }
    }*/
}
