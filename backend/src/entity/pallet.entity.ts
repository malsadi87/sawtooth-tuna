import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CatchPackageEntity } from "./catchPackage.entity";
import { PalletEventEntity } from "./palletEvent.entity";
import { TripEntity } from "./trip.entity";

@Entity('Pallet')
export class PalletEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type:'nvarchar', width: 255, name: 'PalletNum', nullable: false })
    palletNum: string;

    @Column({ type:'int', name: 'ProductNum', nullable: false })
    productNum: number;

    @Column({ type:'nvarchar', width: 255, name: 'SupplierId', nullable: false })
    supplierId: string;

    @Column({ type:'double', name: 'PalletWeight', nullable: false })
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