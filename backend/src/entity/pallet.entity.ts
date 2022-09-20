import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CatchPackageEntity } from "./catchPackage.entity";
import { PalletEventEntity } from "./palletEvent.entity";
import { TripEntity } from "./trip.entity";

@Entity('Pallet')
export class PalletEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: false, type:'varchar', width: 255, name: 'PalletNum', nullable: false })
    palletNum: string;

    @Column({ type:'int', name: 'ProductNum', nullable: false })
    productNum: number;

    @Column({ type:'varchar', width: 255, name: 'SupplierId', nullable: false })
    supplierId: string;

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