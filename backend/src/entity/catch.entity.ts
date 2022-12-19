import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { ConsumerPackageEntity } from "./consumerPackage.entity";
import { HaulEntity } from "./haul.entity";
import { PalletEntity } from "./pallet.entity";
import { SpeciesEntity } from "./species.entity";

@Entity('Catch')
export class CatchEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: true, type: 'int', name: 'PkCatch', nullable: false })
    pkCatch: number;
    
    @Transform(x => new Date(x.value))
    @Column({ type: 'timestamp', name:'UpdatedDateTime', nullable: false })
    updatedDateTime: Date;

    @Column({ type: 'int', name:'Quantity', nullable: false })
    quantity: number;

    @Column({ type: 'int', name:'FkHaul', nullable: false })
    fkHaul: number;

    @Column({ type: 'int', name:'FkSpecies', nullable: false })
    fkSpecies: number;

    @ManyToOne((type) => HaulEntity, x => x.catches)
    @JoinColumn({ name: 'FkHaul', referencedColumnName: 'pkHaul' })
    haul: HaulEntity;

    @ManyToOne((type) => SpeciesEntity, x => x.catches)
    @JoinColumn({ name: 'FkSpecies', referencedColumnName: 'pkSpecies' })
    species: SpeciesEntity;

}