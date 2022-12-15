import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";

@Entity('Species')
export class SpeciesEntity extends BaseEntity {
    @SawtoothIdentity()

    @PrimaryColumn({ generated: true, type: 'int', name: 'PkSpecies', nullable: false })
    pkSpecies: number;

    @Column({ type:'varchar', width: 255, name: 'Name', nullable: false })
    name: string;

    @Column({ type:'varchar', width: 255, name: 'Description', nullable: true })
    description: string;
}