import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TripEntity } from '../../entity/trip.entity';
import { SpeciesAndWeightEntity } from '../../entity/speciesAndWeight.entity';
import { PalletEntity } from '../../entity/pallet.entity';
import { PalletEventEntity } from '../../entity/palletEvent.entity';
import { HaulEntity } from '../../entity/haul.entity';
import { CustomLevelPackageEntity } from '../../entity/customLevelPackage.entity';
import { CompanyEntity } from '../../entity/company.entity';
import { CatchPackageEntity } from '../../entity/catchPackage.entity';
import * as config from 'config';

const dbConfig = config.get('database');
const { type, name, synchronizeFlag, isLogEnable, encrypt } = dbConfig;
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PW } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: type,
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT),
    username: DATABASE_USER,
    password: DATABASE_PW,
    database: name,
    // entities: ["dist/**/*.entity{.ts,.js}"],
    // entities: [
    //     TripEntity,
    //     HaulEntity,
    //     PalletEntity,
    //     SpeciesAndWeightEntity,
    //     PalletEventEntity,
    //     CustomLevelPackageEntity,
    //     CompanyEntity,
    //     CatchPackageEntity,
    //     TestEntity
    // ],
    autoLoadEntities: true,
    logging: isLogEnable,
    synchronize: synchronizeFlag,
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_typeorm',
    migrationsRun: true,
    options: {
        encrypt: encrypt,
        enableArithAbort: true
    }
}