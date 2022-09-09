import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CatchPackageEntity } from "./catchPackage.entity";
import { PalletEventEntity } from "./palletEvent.entity";
import { TripEntity } from "./trip.entity";

@Entity('Pallet')
export class PalletEntity extends BaseEntity {
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
    trip: TripEntity;

    @OneToMany((entity) => PalletEventEntity, (x) => x.palletNum)
    @JoinColumn({ referencedColumnName: 'PalletNum' })
    palletEvenets: PalletEventEntity[];

    @OneToMany((entity) => CatchPackageEntity, (x) => x.palletNum)
    @JoinColumn({ referencedColumnName: 'PalletNum' })
    catchPackages: CatchPackageEntity[];
}