import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatchModule } from './catch/catch.module';
import { CompanyModule } from './company/company.module';
import { CustomLevelPackageModule } from './consumer-package/consumer-package.module';
import { HaulModule } from './haul/haul.module';
import { PalletModule } from './pallet/pallet.module';
import { PalletEventModule } from './pallet-event/pallet-event.module';
import { SpeciesModule } from './species/species.module';
import { TripModule } from './trip/trip.module';
import { ProductModule } from './product/product.module';
import { ProductionModule } from './production/production.module';

@Module({
    imports: [
        HttpModule,
        TripModule,
        ProductModule,
        HaulModule,
        ProductionModule,
        PalletModule,
        PalletEventModule,
        CatchModule,
        SpeciesModule,
        CompanyModule,
        CustomLevelPackageModule
    ]
})
export class TpModule {}
