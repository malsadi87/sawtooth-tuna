import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CustomLevelPackageEntity } from "./customLevelPackage.entity";
import { PalletEntity } from "./pallet.entity";

@Entity('Company')
export class CompanyEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: true, type: 'int', name: 'PkCompany', nullable: false })
    pkCompany: number;

    @Column({ type:'varchar', width: 255, name: 'CompanyName', nullable: false })
    companyName: string;

    @Column({ type:'varchar', width: 255, name: 'CompanyAddress', nullable: false })
    companyAddress: string;

    @Column({ type:'varchar', width: 255, name: 'ContactInfo', nullable: false })
    contactInfo: string;

    // Reference to pallets
    @OneToMany((type) => PalletEntity, (x) => x.company)
    @JoinColumn({ referencedColumnName: 'PkCompany' })
    pallets: PalletEntity[]
}