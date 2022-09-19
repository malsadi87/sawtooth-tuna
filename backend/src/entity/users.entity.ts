import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserClaimsEntity } from "./userClaims.entity";
import { UserLoginsEntity } from "./userLogins.entity";
import { UserRolesEntity } from "./userRoles.entity";
import { UsersBlockchainInfoEntity } from "./usersBlockchainInfo.entity";
import { UserTokensEntity } from "./userTokens.entity";

@Entity('Users')
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'Id' })
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

    @Column({ type:'varchar', width: 256, name: 'NormalizedUserName', nullable: true })
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
    @Expose({ name: 'password' })
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

    @Column({ type:'uuid', name: 'BlockchainInfoId', nullable: true })
    blockchainInfoId: string;

    @OneToMany((entity) => UserClaimsEntity, (x) => x.user, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
    })
    @JoinColumn({ referencedColumnName: 'UserId' })
    claims: UserClaimsEntity[];

    @OneToMany((entity) => UserLoginsEntity, (x) => x.user, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
    })
    @JoinColumn({ referencedColumnName: 'UserId' })
    logins: UserLoginsEntity[];

    @OneToMany(() => UserRolesEntity, userRole => userRole.user)
    @JoinColumn({ referencedColumnName: 'userId' })
    userRoles!: UserRolesEntity[];

    @OneToMany(() => UserTokensEntity, token => token.user)
    @JoinColumn({ referencedColumnName: 'userId' })
    tokens: UserTokensEntity;

    @OneToOne((type) => UsersBlockchainInfoEntity, (x) => x.user)
    @JoinColumn({ name: 'BlockchainInfoId',  referencedColumnName: 'userId' })
    userBlockChainInfo: UsersBlockchainInfoEntity;
}