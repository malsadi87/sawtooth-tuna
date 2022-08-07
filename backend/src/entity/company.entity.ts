import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { CustomLevelPackageEntity } from "./customLevelPackage.entity";

@Entity('Company')
export class CompanyEntity extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'CompanyId', nullable: false })
    companyId: number;

    @Column({ type:'nvarchar', width: 255, name: 'CompanyName', nullable: false })
    companyName: string;

    @Column({ type:'nvarchar', width: 255, name: 'CompanyAddress', nullable: false })
    companyAddress: string;

    @Column({ type:'nvarchar', width: 255, name: 'ContactInfo', nullable: false })
    contactInfo: string;

    @OneToMany((type) => CustomLevelPackageEntity, (x) => x.agent)
    @JoinColumn({ referencedColumnName: 'Agent' })
    customLevelPackages: CustomLevelPackageEntity[]
}