import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CustomLevelPackageEntity } from "./customLevelPackage.entity";
import { PalletEntity } from "./pallet.entity";

@Entity('CatchPackage')
export class CatchPackageEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'varchar', width: 255, name:'CatchPackageId', nullable: false })
    catchPackageId: string;
    
    @Transform(x => new Date(x.value))
    @Column({ type: 'timestamp', name:'PackingDate', nullable: false })
    packingDate: Date;

    @Column({ type: 'varchar', width: 255, name:'PalletNum', nullable: false })
    palletNum: string;

    @ManyToOne((type) => PalletEntity, x => x.catchPackages)
    pallet: PalletEntity;

    @OneToMany((type) => CustomLevelPackageEntity, (x) => x.catchPackageId)
    @JoinColumn({ referencedColumnName: 'CatchPackageId' })
    customLevelPackages: CustomLevelPackageEntity[];
}