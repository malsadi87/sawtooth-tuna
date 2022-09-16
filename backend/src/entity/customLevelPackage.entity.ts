import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtooth-Identity.decorator";
import { CompanyEntity } from "./company.entity";

@Entity('CustomLevelPackage')
export class CustomLevelPackageEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ type: 'varchar', width: 255, name: 'ConsumerPackageId', nullable: false })
    consumerPackageId: string;

    @Column({ type: 'varchar', width: 255, name: 'CatchPackageId', nullable: false })
    catchPackageId: string;

    @Transform(x => new Date(x.value))
    @Column({ type: 'timestamp', name: 'PackingDate', nullable: false })
    packingDate: Date;

    @Column({ type: 'int', name: 'Agent', nullable: false })
    agent: number;

    @ManyToOne((type) => CompanyEntity, x => x.customLevelPackages)
    company: CompanyEntity;
}