import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('UserTokens')
export class UserTokensEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, width: 450, type: 'varchar', name: 'UserId', nullable: false })
    userId: string;

    @PrimaryColumn({ generated: false, width: 128, type: 'varchar', name: 'LoginProvider', nullable: false })
    loginProvider: string;

    @PrimaryColumn({ generated: false, width: 128, type: 'varchar', name: 'Name', nullable: false })
    name: string;

    @Column({ type: 'varchar', width: 512, name: 'Value', nullable: true })
    value: string;

    @ManyToOne(() => UsersEntity, (user) => user.tokens)
    user!: UsersEntity;
}