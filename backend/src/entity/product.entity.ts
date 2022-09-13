import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'Product' })
export class ProductEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'int', name: 'ProductId', nullable: false })
    productId: number;

    @Column({ type:'varchar', width: 255, name: 'ProductName' })
    productName: string;

    @Column({ type:'varchar', width: 255, name: 'ProductDescription' })
    productDescription: string;

    @Column({ type:'int', name: 'ProductNumber', nullable: false })
    productNumber: number;

}