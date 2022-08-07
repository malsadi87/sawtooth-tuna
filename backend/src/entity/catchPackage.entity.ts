import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CustomLevelPackageEntity } from "./customLevelPackage.entity";
import { PalletEntity } from "./pallet.entity";

@Entity('CatchPackage')
export class CatchPackageEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'nvarchar', width: 255, name:'CatchPackageId', nullable: false })
    catchPackageId: string;
    
    @Column({ type: 'datetime', name:'PackingDate', nullable: false })
    packingDate: Date;

    @Column({ type: 'nvarchar', width: 255, name:'PalletNum', nullable: false })
    palletNum: string;

    @ManyToOne((type) => PalletEntity, x => x.catchPackages)
    pallet: PalletEntity;

    @OneToMany((type) => CustomLevelPackageEntity, (x) => x.catchPackageId)
    @JoinColumn({ referencedColumnName: 'CatchPackageId' })
    customLevelPackages: CustomLevelPackageEntity[];
}