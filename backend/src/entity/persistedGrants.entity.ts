import { BaseEntity, Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity('PersistedGrants')
// @Index("IX_PersistedGrants_SubjectId_ClientId_Type", ["SubjectId", "ClientId", "Type"])
// @Index("IX_PersistedGrants_SubjectId_SessionId_Type", ["SubjectId", "SessionId", "Type"])
// @Index("IX_PersistedGrants_SubjectId_ClientId_Type", { synchronize: false })
// @Index("IX_PersistedGrants_SubjectId_SessionId_Type", { synchronize: false })
export class PersistedGrantsEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, width: 256, type: 'varchar', name: 'Key', nullable: false })
    key: string;

    @Column({ type:'varchar', width: 50, name: 'Type', nullable: true })
    type: string;

    @Column({ type:'varchar', width: 200, name: 'SubjectId', nullable: true })
    subjectId: string;

    @Column({ type:'varchar', width: 100, name: 'SessionId', nullable: true })
    sessionId: string;

    @Column({ type:'varchar', width: 200, name: 'ClientId', nullable: true })
    clientId: string;

    @Column({ type:'varchar', width: 200, name: 'Description', nullable: true })
    description: string;

    @Column({ type:'datetime', name: 'CreationTime', nullable: false })
    creationTime: Date;

    @Column({ type:'datetime', name: 'Expiration', nullable: true })
    @Index("IX_PersistedGrants_Expiration")
    expiration: Date;

    @Column({ type:'datetime', name: 'ConsumedTime', nullable: true })
    consumedTime: Date;

    @Column({ type:'nvarchar', width: 4000, name: 'Data', nullable: true })
    data: string;
}