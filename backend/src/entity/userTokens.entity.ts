import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('UserTokens')
export class UserTokensEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'uuid', name: 'UserId', nullable: false })
    userId: string;

    @PrimaryColumn({ generated: false, width: 128, type: 'varchar', name: 'LoginProvider', nullable: false })
    loginProvider: string;

    @PrimaryColumn({ generated: false, width: 128, type: 'varchar', name: 'Name', nullable: false })
    name: string;

    @Column({ type: 'varchar', width: 512, name: 'Value', nullable: true })
    value: string;

    @ManyToOne(() => UsersEntity, (user) => user.tokens)
    @JoinColumn({ name: 'UserId', referencedColumnName: 'id' })
    user!: UsersEntity;
}