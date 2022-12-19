import { Transform } from "class-transformer";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { HaulEntity } from "./haul.entity";
import { PalletEntity } from "./pallet.entity";
import { ProductEntity } from "./product.entity";

// A production is a processed and packed "bag" of fish of one type of species stemming from a single catch.

@Entity('Production')
export class ProductionEntity extends BaseEntity {
  @SawtoothIdentity()
  @PrimaryColumn({ generated: true, type: 'int', name: 'PkProduction', nullable: false })
  pkProduction: number;

  @Transform(x => new Date(x.value))
  @Column({ type: 'timestamp', name: 'ProductionDate', nullable: false })
  productionDate: Date;

  @Column({ type: 'int', name: 'FkPallet', nullable: false })
  fkPallet: number;

  @Column({ type: 'int', name: 'FkProduct', nullable: false })
  fkProduct: number;

  @Column({ type: 'int', name: 'FkHaul', nullable: false })
  fkHaul: number;

  @ManyToOne((type) => PalletEntity, x => x.productions)
  @JoinColumn({ name: 'FkPallet', referencedColumnName: 'pkPallet' })
  pallet: PalletEntity;

  @ManyToOne((type) => ProductEntity, x => x.productions)
  @JoinColumn({ name: 'FkProduct', referencedColumnName: 'pkProduct' })
  product: ProductEntity;

  @ManyToOne((type) => HaulEntity, x => x.productions)
  @JoinColumn({ name: 'FkHaul', referencedColumnName: 'pkHaul' })
  haul: HaulEntity;

}