import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('ExternalAPIDetails')
export class ExternalAPIDetailsEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'int', name: 'Id', nullable: false })
    id: number;

    @Column({ type:'varchar', width: 512, name: 'UserName', nullable: true })
    userName: string;

    @Column({ type:'varchar', width: 4000, name: 'Password', nullable: true })
    password: string;

    @Column({ type:'smallint', name: 'Provider', nullable: false })
    provider: number;

    @Column({ type:'varchar', width: 512, name: 'TokenUrl', nullable: true })
    tokenUrl: string;

    @Column({ type:'varchar', width: 512, name: 'AccessToken', nullable: true })
    accessToken: string;

    @Column({ type:'varchar', width: 1000, name: 'RefreshToken', nullable: true })
    refreshToken: string;

    @Column({ type:'datetime', name: 'IssueAt', nullable: false })
    issueAt: Date;

    @Column({ type:'datetime', name: 'ExpiresAt', nullable: false })
    expiresAt: Date;

    @Column({ type:'datetime', name: 'Created', nullable: false })
    created: Date;

    @Column({ type:'varchar', width: 512, name: 'CreatedBy', nullable: true })
    createdBy: string;

    @Column({ type:'datetime', name: 'LastModified', nullable: true })
    lastModified: Date;

    @Column({ type:'varchar', width: 512, name: 'LastModifiedBy', nullable: true })
    lastModifiedBy: string;
}