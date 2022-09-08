import { EntityRepository, Repository } from 'typeorm';
import { PalletEntity } from '../../../../../entity/pallet.entity';

@EntityRepository(PalletEntity)
export class PalletRepository extends Repository<PalletEntity> {

}
