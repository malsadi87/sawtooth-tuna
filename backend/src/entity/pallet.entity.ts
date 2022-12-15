import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CatchEntity } from "./catch.entity";
import { PalletEventEntity } from "./palletEvent.entity";
import { TripEntity } from "./trip.entity";
import * as pg from 'pg';

pg.types.setTypeParser(1700, function(val) {
    return parseFloat(val);
});

@Entity('Pallet')
export class PalletEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: false, type:'varchar', width: 255, name: 'PalletNum', nullable: false })
    palletNum: string;

    @Column({ type:'int', name: 'ProductId', nullable: false })
    productId: number;

    @Column({ type:'varchar', width: 255, name: 'SupplierId', nullable: false })
    supplierId: string;

    @Column({ type:'numeric', name: 'PalletWeight', nullable: false })
    palletWeight: number;

    @PrimaryColumn({ type:'int', name: 'PkTrip', nullable: false })
    pkTrip: number;

    @ManyToOne((type) => TripEntity, x => x.pallets)
    @JoinColumn({ name: 'PkTrip', referencedColumnName: 'pkTrip' })
    trip: TripEntity;

    @OneToMany((entity) => PalletEventEntity, (x) => x.pallet)
    @JoinColumn({ referencedColumnName: 'PalletNum' })
    palletEvenets: PalletEventEntity[];

    // TODO: Create relation production
    //@OneToMany((entity) => CatchEntity, (x) => x.pallet)
    //@JoinColumn({ referencedColumnName: 'PalletNum' })
    //catchs: CatchEntity[];
}