import { BaseEntity, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";
import { UsersEntity } from "./users.entity";

@Entity('UserRoles')
export class UserRolesEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'uuid', name: 'UserId', nullable: false })
    userId: string;

    @PrimaryColumn({ generated: false, type: 'uuid', name: 'RoleId', nullable: false })
    @Index("IX_AspNetUserRoles_RoleId")
    roleId: string;

    @ManyToOne(() => UsersEntity, (usere) => usere.userRoles)
    @JoinColumn({ name: 'UserId', referencedColumnName: 'id' })
    user!: UsersEntity;

    @ManyToOne(() => RolesEntity, (rolee) => rolee.userRoles)
    @JoinColumn({ name: 'RoleId', referencedColumnName: 'id' })
    role!: RolesEntity;
}