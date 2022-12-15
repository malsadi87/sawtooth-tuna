import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';
import { CustomPackageCreationDto } from '../../../../utility/dto/tp/custom-package-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CustomLevelPackageRepository } from './custom-level-package.repository';
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

    /*
    async getData(consumerPackageId: string): Promise<{
      customLevelPackage: CustomLevelPackageEntity, 
      catchObject: CatchEntity,
      pallet: PalletEntity,
      palletEvent: PalletEventEntity[],
      trip: TripEntity,
      company: CompanyEntity,
      species: SpeciesEntity,
      product: ProductEntity,
      haul: HaulEntity[]
    }> {
        
        const customLevelPackage = await this.customLevelPackageRepository. getByConsumerPackageId(consumerPackageId);
        const catchObject = await this.catchService.getById(customLevelPackage.pkCatch)
        const pallet = await this.palletService.getByPalletNo(catchObject.palletNum)
        const palletEvent = await this.palletEventService.getByPalletNumber(catchObject.palletNum)
        const trip = await this.tripService.getByPkTrip(pallet.pkTrip)
        const company = await this.companyService.getById(customLevelPackage.agent)
        const product = await this.productService.getByProductNum(pallet.productNum)
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
