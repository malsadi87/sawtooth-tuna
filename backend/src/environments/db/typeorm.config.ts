import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TripEntity } from '../../entity/trip.entity';
import { SpeciesAndWeightEntity } from '../../entity/speciesAndWeight.entity';
import { PalletEntity } from '../../entity/pallet.entity';
import { PalletEventEntity } from '../../entity/palletEvent.entity';
import { HaulEntity } from '../../entity/haul.entity';
import { CustomLevelPackageEntity } from '../../entity/customLevelPackage.entity';
import { CompanyEntity } from '../../entity/company.entity';
import { CatchPackageEntity } from '../../entity/catchPackage.entity';
import { UsersEntity } from '../../entity/users.entity';
import { RolesEntity } from '../../entity/roles.entity';
import { DeviceCodesEntity } from '../../entity/deviceCodes.entity';
import { PersistedGrantsEntity } from '../../entity/persistedGrants.entity';
import { RoleClaimsEntity } from '../../entity/roleClaims.entity';
import { UserClaimsEntity } from '../../entity/userClaims.entity';
import { UserLoginsEntity } from '../../entity/userLogins.entity';
import { UserRolesEntity } from '../../entity/userRoles.entity';
import { UserTokensEntity } from '../../entity/userTokens.entity';
import { ExternalAPIDetailsEntity } from '../../entity/externalAPIDetails.entity';
import { ExternalAPISettingsEntity } from '../../entity/externalAPISettings.entity';
import * as config from 'config';

const dbConfig = config.get('database');
const { type, name, synchronizeFlag, isLogEnable, encrypt } = dbConfig;
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PW } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'tunachain-db',
    port: 3306,
    username: 'user',
    password: 'mysql',
    database: 'demo',
    entities: [
        TripEntity,
        HaulEntity,
        PalletEntity,
        SpeciesAndWeightEntity,
        PalletEventEntity,
        CustomLevelPackageEntity,
        CompanyEntity,
        CatchPackageEntity,
        ExternalAPIDetailsEntity,
        ExternalAPISettingsEntity,
        DeviceCodesEntity,
        PersistedGrantsEntity,
        
        UsersEntity,
        RolesEntity,
        UserRolesEntity,

        RoleClaimsEntity,
        UserClaimsEntity,
        UserLoginsEntity,
        UserTokensEntity
    ],
    synchronize: true,
    // autoLoadEntities: true,
    // logging: true,
    // migrations: ['dist/migrations/*{.ts,.js}'],
    // migrationsTableName: '__MigrationHistory',
    // migrationsRun: false,
}