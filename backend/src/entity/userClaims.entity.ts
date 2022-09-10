import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('UserClaims')
export class UserClaimsEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'int', name: 'Id', nullable: false })
    id: number;

    @Column({ type:'uuid', name: 'UserId', nullable: true })
    @Index("IX_AspNetUserClaims_UserId")
    userId: string;

    @Column({ type:'varchar', width: 4000, name: 'ClaimType', nullable: true })
    claimType: string;

    @Column({ type:'varchar', width: 4000, name: 'ClaimValue', nullable: true })
    claimValue: string;
    
    @ManyToOne((type) => UsersEntity, x => x.claims)
    user: UsersEntity;
}