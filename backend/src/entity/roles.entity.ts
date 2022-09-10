import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { RoleClaimsEntity } from "./roleClaims.entity";
import { UserRolesEntity } from "./userRoles.entity";

@Entity('Roles')
export class RolesEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'Id' })
    id: string;

    @Column({ type:'varchar', width: 256, name: 'Name', nullable: true })
    name: string;

    @Column({ type:'varchar', width: 256, name: 'NormalizedName', nullable: true })
    @Index({ unique: true })
    normalizedName: string;

    @Column({ type:'varchar', width: 4000, name: 'ConcurrencyStamp', nullable: true })
    concurrencyStamp: string;

    @OneToMany((entity) => RoleClaimsEntity, (x) => x.roleId, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
    })
    @JoinColumn({ referencedColumnName: 'RoleId' })
    claims: RoleClaimsEntity[];

    @OneToMany(() => UserRolesEntity, userRole => userRole.role)
    @JoinColumn({ referencedColumnName: 'RoleId' })
    userRoles!: UserRolesEntity[];
}