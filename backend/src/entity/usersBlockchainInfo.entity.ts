import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('UsersBlockchainInfo')
export class UsersBlockchainInfoEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'Id' })
    id: string;

    @Column({ type:'uuid', name: 'UserId', nullable: false })
    @Index({ unique: true })
    userId: string;

    @Column({ type:'varchar', width: 1000, name: 'PublicKey', nullable: true })
    publicKey: string;

    @Column({ type:'varchar', width: 1000, name: 'PrivateKey', nullable: true })
    privateKey: string;

    @Column({ type:'timestamp', name: 'CreatedDate', nullable: false })
    createdDate: Date;

    @Column({ type:'uuid', name: 'CreatedBy', nullable: true })
    createdBy: string;

    @Column({ type:'timestamp', name: 'UpdatedDate', nullable: false })
    updatedDate: Date;

    @Column({ type:'varchar', width: 2000, name: 'UpdatedBy', nullable: true })
    updatedBy: string;

    @Column({ type:'boolean', name: 'IsActive', nullable: false })
    isActive: boolean;

    @OneToOne((type) => UsersEntity, (x) => x.userBlockChainInfo)
    @JoinColumn({ name: 'UserId', referencedColumnName: 'id' })
    user: UsersEntity;
}