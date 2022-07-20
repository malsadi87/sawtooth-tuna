import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";

@Entity('custom_level_package')
export class CustomLevelPackageEntity extends BaseEntity {
    @PrimaryColumn({ type: 'nvarchar', width: 255, name: 'ConsumerPackageId', nullable: false })
    consumerPackageId: string;

    @Column({ type: 'nvarchar', width: 255, name: 'CatchPackageId', nullable: false })
    catchPackageId: string;

    @Column({ type: 'datetime', name: 'PackingDate', nullable: false })
    packingDate: Date;

    @Column({ type: 'int', name: 'Agent', nullable: false })
    agent: number;

    @ManyToOne((type) => CompanyEntity, x => x.customLevelPackages)
    company: CompanyEntity;
}