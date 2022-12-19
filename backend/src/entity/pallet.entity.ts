import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CatchEntity } from "./catch.entity";
import { PalletEventEntity } from "./palletEvent.entity";
import { TripEntity } from "./trip.entity";
import * as pg from 'pg';
import { CompanyEntity } from "./company.entity";
import { ConsumerPackageEntity } from "./consumerPackage.entity";

pg.types.setTypeParser(1700, function(val) {
    return parseFloat(val);
});

@Entity('Pallet')
export class PalletEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: true, type:'int', name: 'PkPallet', nullable: false })
    pkPallet: number;

    @Column({ type:'varchar', name: 'PalletId', nullable: false })
    palletId: string;

    @Column({ type:'numeric', name: 'Quantity', nullable: false })
    quantity: number;

    @Column({ type:'int', name: 'FkCompany', nullable: false })
    fkCompany: number;

    @ManyToOne((type) => CompanyEntity, x => x.pallets)
    @JoinColumn({ name: 'FkCompany', referencedColumnName: 'pkCompany' })
    company: CompanyEntity;

    @OneToMany((entity) => PalletEventEntity, (x) => x.pallet)
    @JoinColumn({ referencedColumnName: 'PkPallet' })
    palletEvents: PalletEventEntity[];

    @OneToMany((entity) => ConsumerPackageEntity, (x) => x.pallet)
    @JoinColumn({ referencedColumnName: 'PkPallet' })
    palletConsumerPackages: ConsumerPackageEntity[];

    // TODO: Create relation production
    //@OneToMany((entity) => CatchEntity, (x) => x.pallet)
    //@JoinColumn({ referencedColumnName: 'PkPallet' })
    //catchs: CatchEntity[];
}