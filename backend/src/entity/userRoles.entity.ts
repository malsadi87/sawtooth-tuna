import { BaseEntity, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";
import { UsersEntity } from "./users.entity";

@Entity('UserRoles')
export class UserRolesEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, width: 450, type: 'varchar', name: 'UserId', nullable: false })
    userId: string;

    @PrimaryColumn({ generated: false, width: 450, type: 'varchar', name: 'RoleId', nullable: false })
    @Index("IX_AspNetUserRoles_RoleId", { synchronize: false })
    roleId: string;

    // @ManyToOne(() => UsersEntity, (usere) => usere.userRoles)
    // user!: UsersEntity;

    // @ManyToOne(() => RolesEntity, (rolee) => rolee.userRoles)
    // role!: RolesEntity;
}