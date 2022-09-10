import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";

@Entity('RoleClaims')
export class RoleClaimsEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'int', name: 'Id', nullable: false })
    id: number;

    @Column({ type:'uuid', name: 'RoleId', nullable: true })
    @Index("IX_AspNetRoleClaims_RoleId")
    roleId: string;

    @Column({ type:'varchar', width: 256, name: 'ClaimType', nullable: true })
    claimType: string;

    @Column({ type:'varchar', width: 512, name: 'ClaimValue', nullable: true })
    claimValue: string;
    
    @ManyToOne((type) => RolesEntity, x => x.claims)
    role: RolesEntity;
}