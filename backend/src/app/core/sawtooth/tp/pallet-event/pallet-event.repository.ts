import { EntityRepository, Repository } from 'typeorm';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';

@EntityRepository(PalletEventEntity)
export class PalletEventRepository extends Repository<PalletEventEntity> {

}
