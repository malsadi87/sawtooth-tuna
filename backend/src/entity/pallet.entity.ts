import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CatchPackageEntity } from "./catchPackage.entity";
import { PalletEventEntity } from "./palletEvent.entity";
import { TripEntity } from "./trip.entity";

@Entity('Pallet')
export class PalletEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: true, type:'int', name: 'PalletNum', nullable: false })
    palletNum: number;

    @Column({ type:'int', name: 'ProductNum', nullable: false })
    productNum: number;

    @Column({ type:'int', name: 'SupplierId', nullable: false })
    supplierId: number;

    @Column({ type:'numeric', precision: 9, scale: 4, name: 'PalletWeight', nullable: false })
    palletWeight: number;

    @PrimaryColumn({ type:'int', name: 'TripNo', nullable: false })
    tripNo: number;

    @ManyToOne((type) => TripEntity, x => x.pallets)
    @JoinColumn({ name: 'TripNo', referencedColumnName: 'tripNo' })
    trip: TripEntity;

    @OneToMany((entity) => PalletEventEntity, (x) => x.pallet)
    @JoinColumn({ referencedColumnName: 'PalletNum' })
    palletEvenets: PalletEventEntity[];

    @OneToMany((entity) => CatchPackageEntity, (x) => x.pallet)
    @JoinColumn({ referencedColumnName: 'PalletNum' })
    catchPackages: CatchPackageEntity[];
}