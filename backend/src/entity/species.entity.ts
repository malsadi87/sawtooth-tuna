import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { CatchEntity } from "./catch.entity";
import { ProductEntity } from "./product.entity";

@Entity('Species')
export class SpeciesEntity extends BaseEntity {
    @SawtoothIdentity()

    @PrimaryColumn({ generated: true, type: 'int', name: 'PkSpecies', nullable: false })
    pkSpecies: number;

    @Column({ type:'varchar', width: 255, name: 'Name', nullable: false })
    name: string;

    @Column({ type:'varchar', width: 255, name: 'Description', nullable: true })
    description: string;

    @OneToMany((entity) => CatchEntity, (x) => x.species)
    @JoinColumn({ referencedColumnName: 'PkCatch' })
    catches: CatchEntity[];

    @OneToMany((entity) => ProductEntity, (x) => x.species)
    @JoinColumn({ referencedColumnName: 'PkCatch' })
    products: CatchEntity[];
}