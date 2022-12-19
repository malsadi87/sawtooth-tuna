import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { ProductionEntity } from "./production.entity";
import { SpeciesEntity } from "./species.entity";

@Entity({ name: 'Product' })
export class ProductEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: true, type: 'int', name: 'PkProduct', nullable: false })
    pkProduct: number;

    @Column({ type:'varchar', width: 255, name: 'Title' })
    title: string;

    @Column({ type:'varchar', width: 255, name: 'PalletId' })
    palletId: string;

    @Column({ type: 'int', name:'FkSpecies', nullable: false })
    fkSpecies: number;

    @ManyToOne((type) => SpeciesEntity, x => x.products)
    @JoinColumn({ name: 'FkSpecies', referencedColumnName: 'pkSpecies' })
    species: SpeciesEntity;

    @OneToMany((entity) => ProductionEntity, (x) => x.product)
    @JoinColumn({ referencedColumnName: 'PkProduct' })
    productions: ProductionEntity[];
}