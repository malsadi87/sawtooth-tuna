import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLevelPackageService } from './consumer-package.service';
import { CustomLevelPackageController } from './consumer-package.controller';
import { CustomLevelPackageRepository } from './consumer-package.repository';
import { ConsumerPackageEntity } from '../../../../../entity/consumerPackage.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { CatchModule } from '../catch/catch.module';
import { PalletModule } from '../pallet/pallet.module';
import { HaulModule } from '../haul/haul.module';
import { PalletEventModule } from '../pallet-event/pallet-event.module';
import { ProductModule } from '../product/product.module';
import { SpeciesModule } from '../species/species.module';
import { TripModule } from '../trip/trip.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumerPackageEntity]),
    SawtoothUtilityModule,
    PalletModule,
    CatchModule,
    HaulModule,
    PalletEventModule,
    ProductModule,
    SpeciesModule,
    TripModule,
    CompanyModule
  ],
  providers: [CustomLevelPackageService, CustomLevelPackageRepository],
  controllers: [CustomLevelPackageController]
})
export class CustomLevelPackageModule {}
