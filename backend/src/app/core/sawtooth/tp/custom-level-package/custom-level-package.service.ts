import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';
import { CustomPackageCreationDto } from '../../../../utility/dto/tp/custom-package-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CustomLevelPackageRepository } from './custom-level-package.repository';
import { CatchPackageService } from '../catch-package/catch-package.service';
import { CatchPackageEntity } from 'src/entity/catchPackage.entity';
import { PalletService } from '../pallet/pallet.service';
import { HaulService } from '../haul/haul.service';
import { CompanyService } from '../company/company.service';
import { PalletEventService } from '../pallet-event/pallet-event.service';
import { ProductService } from '../product/product.service';
import { SpeciesAndWeightService } from '../species-and-weight/species-and-weight.service';
import { TripService } from '../trip/trip.service';

@Injectable()
export class CustomLevelPackageService {
    private readonly entityName: string;
    constructor(
        private readonly customLevelPackageRepository: CustomLevelPackageRepository,
        private readonly palletService: PalletService,
        private readonly haulService: HaulService,
        private readonly catchPackageService: CatchPackageService,
        private readonly companyService: CompanyService,
        private readonly palletEventService: PalletEventService,
        private readonly productService: ProductService,
        private readonly speciesAndWeightService: SpeciesAndWeightService,
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

    async getData(consumerPackageId: string): Promise<{
      customLevelPackage: CustomLevelPackageEntity, 
      catchPackage: CatchPackageEntity
    }> {
        
        const customLevelPackage = await this.customLevelPackageRepository. getByConsumerPackageId(consumerPackageId);
        
        const catchPackage = await this.catchPackageService.getById(customLevelPackage.catchPackageId)

        const pallet = await this.palletService.getByPalletNo(catchPackage.palletNum)

  //      const palletEvent = await this.palletEventService.getByPalletNumber(catchPackage.palletNum)
        
        const trip = await this.tripService.getByTripNo(pallet.tripNo)

        const company = await this.companyService.getById(customLevelPackage.agent)

//        const species = await this.speciesAndWeightService.get
        
//    const speciesResult = await speciesService.getByCatchPackageId(customPackageResult.catchPackageId)
//    console.log("speciesResult:", speciesResult)
//
//    const productResult = await productService.getByProductNum(palletResult.productNum)
//    console.log("productResult:", productResult)
//
//    const haulResult = await haulService.getByTripNo(palletResult.tripNo)
//    console.log("haulResult:", haulResult)


        return {
          customLevelPackage: customLevelPackage,
          catchPackage: catchPackage
        }
    }
}
