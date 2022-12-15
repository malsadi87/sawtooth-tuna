import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TripEntity } from '../../entity/trip.entity';
import { ProductEntity } from '../../entity/product.entity';
import { SpeciesEntity } from '../../entity/species.entity';
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
import { UsersBlockchainInfoEntity } from '../../entity/usersBlockchainInfo.entity';
import { ChainEntitySubscriber } from '../../app/utility/subscriber/chainEntity.subscriber';
import * as config from 'config';

const dbConfig = config.get<any>('database');
const { type, name, synchronizeFlag, isLogEnable, encrypt } = dbConfig;
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PW } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: type,
    host: DATABASE_HOST,
    port: +DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PW,
    database: name,
    entities: [
        TripEntity,
        ProductEntity,
        HaulEntity,
        PalletEntity,
        PalletEventEntity,
        CatchPackageEntity,
        SpeciesEntity,
        CompanyEntity,
        CustomLevelPackageEntity,

        UsersEntity,
        RolesEntity,
        DeviceCodesEntity,
        PersistedGrantsEntity,
        RoleClaimsEntity,
        UserClaimsEntity,
        UserLoginsEntity,
        UserRolesEntity,
        UserTokensEntity,

        UsersBlockchainInfoEntity,

        ExternalAPIDetailsEntity,
        ExternalAPISettingsEntity
    ],
    subscribers: [
        // ChainEntitySubscriber
    ],
    synchronize: Boolean(synchronizeFlag),
    logging: Boolean(isLogEnable),
    // autoLoadEntities: true,
    // migrations: ['dist/migrations/*{.ts,.js}'],
    // migrationsTableName: '__MigrationHistory',
    // migrationsRun: false,
}