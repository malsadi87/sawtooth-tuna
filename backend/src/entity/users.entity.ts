import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { UserClaimsEntity } from "./userClaims.entity";
import { UserLoginsEntity } from "./userLogins.entity";
import { UserRolesEntity } from "./userRoles.entity";
import { UserTokensEntity } from "./userTokens.entity";

@Entity('Users')
export class UsersEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'varchar', width: 450, name: 'Id', nullable: false })
    id: string;

    @Column({ type:'varchar', width: 2000, name: 'FullName', nullable: true })
    fullName: string;

    @Column({ type:'boolean', name: 'IsActive' })
    isActive: boolean;

    @Column({ type:'timestamp', name: 'CreatedDate', nullable: false })
    createdDate: Date;

    @Column({ type:'varchar', width: 2000, name: 'CreatedBy', nullable: true })
    createdBy: string;

    @Column({ type:'timestamp', name: 'UpdatedDate', nullable: false })
    updatedDate: Date;

    @Column({ type:'varchar', width: 2000, name: 'UpdatedBy', nullable: true })
    updatedBy: string;

    @Column({ type:'varchar', width: 256, name: 'UserName', nullable: true })
    userName: string;

    @Column({ type:'varchar', width: 256, name: 'NormalizedName', nullable: true })
    @Index({ unique: true })
    normalizedUserName: string;

    @Column({ type:'varchar', width: 256, name: 'Email', nullable: true })
    email: string;

    @Column({ type:'varchar', width: 256, name: 'NormalizedEmail', nullable: true })
    @Index('EmailIndex')
    normalizedEmail: string;

    @Column({ type:'boolean', name: 'EmailConfirmed', nullable: false })
    emailConfirmed: boolean;

    @Column({ type:'varchar', width: 2000, name: 'PasswordHash', nullable: true })
    passwordHash: string;

    @Column({ type:'varchar', width: 2000, name: 'SecurityStamp', nullable: true })
    securityStamp: string;

    @Column({ type:'varchar', width: 2000, name: 'ConcurrencyStamp', nullable: true })
    concurrencyStamp: string;

    @Column({ type:'varchar', width: 2000, name: 'PhoneNumber', nullable: true })
    phoneNumber: string;

    @Column({ type:'boolean', name: 'PhoneNumberConfirmed', nullable: false })
    phoneNumberConfirmed: boolean;

    @Column({ type:'boolean', name: 'TwoFactorEnabled', nullable: false })
    twoFactorEnabled: boolean;

    @Column({ type:'timestamp', name: 'LockoutEnd', nullable: true })
    lockoutEnd: Date;

    @Column({ type:'boolean', name: 'LockoutEnabled', nullable: false })
    lockoutEnabled: boolean;

    @Column({ type:'int', name: 'AccessFailedCount', nullable: false })
    accessFailedCount: number;

    // @OneToMany((entity) => UserClaimsEntity, (x) => x.userId, {
    //     onDelete: "CASCADE",
    //     onUpdate: "NO ACTION"
    // })
    // @JoinColumn({ referencedColumnName: 'UserId' })
    // claims: UserClaimsEntity[];

    // @OneToMany((entity) => UserLoginsEntity, (x) => x.userId, {
    //     onDelete: "CASCADE",
    //     onUpdate: "NO ACTION"
    // })
    // @JoinColumn({ referencedColumnName: 'UserId' })
    // logins: UserLoginsEntity[];

    // @OneToMany(() => UserTokensEntity, token => token.userId)
    // @JoinColumn({ referencedColumnName: 'UserId' })
    // tokens: UserTokensEntity;

    // @OneToMany(() => UserRolesEntity, userRole => userRole.user)
    // @JoinColumn({ referencedColumnName: 'UserId' })
    // userRoles!: UserRolesEntity[];
}