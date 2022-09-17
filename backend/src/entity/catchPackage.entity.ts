import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CustomLevelPackageEntity } from "./customLevelPackage.entity";
import { PalletEntity } from "./pallet.entity";

@Entity('CatchPackage')
export class CatchPackageEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: false, type: 'varchar', width: 255, name:'CatchPackageId', nullable: false })
    catchPackageId: string;
    
    @Transform(x => new Date(x.value))
    @Column({ type: 'timestamp', name:'PackingDate', nullable: false })
    packingDate: Date;

    @Column({ type: 'varchar', width: 255, name:'PalletNum', nullable: false })
    palletNum: string;

    @ManyToOne((type) => PalletEntity, x => x.catchPackages)
    @JoinColumn({ name: 'PalletNum', referencedColumnName: 'palletNum' })
    pallet: PalletEntity;

    @OneToMany((type) => CustomLevelPackageEntity, (x) => x.catchPackage)
    @JoinColumn({ referencedColumnName: 'CatchPackageId' })
    customLevelPackages: CustomLevelPackageEntity[];
}