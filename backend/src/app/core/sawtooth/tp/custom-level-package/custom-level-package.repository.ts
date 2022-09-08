import { EntityRepository, Repository } from 'typeorm';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';

@EntityRepository(CustomLevelPackageEntity)
export class CustomLevelPackageRepository extends Repository<CustomLevelPackageEntity> {

}
