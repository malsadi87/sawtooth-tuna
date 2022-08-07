import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { RoleClaimsEntity } from "./roleClaims.entity";
import { UserRolesEntity } from "./userRoles.entity";

@Entity('Roles')
export class RolesEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'varchar', width: 450, name: 'Id', nullable: false })
    id: string;

    @Column({ type:'varchar', width: 256, name: 'Name', nullable: true })
    name: string;

    @Index("RoleNameIndex", { unique: true })
    @Column({ type:'varchar', width: 256, name: 'NormalizedName', nullable: true })
    normalizedName: string;

    @Column({ type:'nvarchar', width: 4000, name: 'ConcurrencyStamp', nullable: true })
    concurrencyStamp: string;

    @OneToMany((entity) => RoleClaimsEntity, (x) => x.roleId, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
    })
    @JoinColumn({ referencedColumnName: 'RoleId' })
    claims: RoleClaimsEntity[];

    @OneToMany(() => UserRolesEntity, userRole => userRole.role)
    // @JoinColumn({ referencedColumnName: 'RoleId' })
    userRoles!: UserRolesEntity[];
}