import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtooth-Identity.decorator";

@Entity({ name: 'Product' })
export class ProductEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: false, type: 'int', name: 'ProductId', nullable: false })
    productId: number;

    @Column({ type:'varchar', width: 255, name: 'ProductName' })
    productName: string;

    @Column({ type:'varchar', width: 255, name: 'ProductDescription' })
    productDescription: string;

    @Column({ type:'int', name: 'ProductNum', nullable: false })
    productNum: number;

}