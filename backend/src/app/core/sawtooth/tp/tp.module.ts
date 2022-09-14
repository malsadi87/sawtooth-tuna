import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatchPackageModule } from './catch-package/catch-package.module';
import { CompanyModule } from './company/company.module';
import { CustomLevelPackageModule } from './custom-level-package/custom-level-package.module';
import { HaulModule } from './haul/haul.module';
import { PalletModule } from './pallet/pallet.module';
import { PalletEventModule } from './pallet-event/pallet-event.module';
import { SpeciesAndWeightModule } from './species-and-weight/species-and-weight.module';
import { TripModule } from './trip/trip.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        HttpModule,
        TripModule,
        ProductModule,
        HaulModule,
        PalletModule,
        PalletEventModule,
        CatchPackageModule,
        SpeciesAndWeightModule,
        CompanyModule,
        CustomLevelPackageModule
    ]
})
export class TpModule {}
