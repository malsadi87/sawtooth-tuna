import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CatchEntity } from "./catch.entity";
import { CompanyEntity } from "./company.entity";
import { PalletEntity } from "./pallet.entity";

@Entity('ConsumerPackage')
export class ConsumerPackageEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: true, type: 'int', name: 'PkConsumerPackage', nullable: false })
    pkConsumerPackage: number;

    @Transform(x => new Date(x.value))
    @Column({ type: 'timestamp', name: 'PackingDateTime', nullable: false })
    packingDateTime: Date;

    @Column({ type: 'int', name: 'FkPallet', nullable: false })
    fkPallet: number;

    @ManyToOne((type) => PalletEntity, x => x.palletConsumerPackages)
    @JoinColumn({ name: 'FkPallet', referencedColumnName: 'pkPallet' })
    pallet: PalletEntity;
}