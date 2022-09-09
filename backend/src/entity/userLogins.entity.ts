import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('UserLogins')
export class UserLoginsEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, width: 128, type: 'varchar', name: 'LoginProvider', nullable: false })
    loginProvider: string;

    @PrimaryColumn({ generated: false, width: 128, type: 'varchar', name: 'ProviderKey', nullable: false })
    providerKey: string;

    @Column({ type:'varchar', width: 512, name: 'ProviderDisplayName', nullable: true })
    providerDisplayName: string;

    @Column({ type:'varchar', width: 450, name: 'UserId', nullable: true })
    @Index("IX_AspNetUserLogins_UserId")
    userId: string;

    @ManyToOne((type) => UsersEntity, x => x.logins)
    user: UsersEntity;
}