import { BaseEntity, Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity('DeviceCodes')
export class DeviceCodesEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, width: 200, type: 'varchar', name: 'UserCode', nullable: false })
    userCode: string;

    @Column({ type:'varchar', width: 200, name: 'DeviceCode', nullable: true })
    @Index({ unique: true })
    deviceCode: string;

    @Column({ type:'varchar', width: 200, name: 'SubjectId', nullable: true })
    subjectId: string;

    @Column({ type:'varchar', width: 100, name: 'SessionId', nullable: true })
    sessionId: string;

    @Column({ type:'varchar', width: 200, name: 'ClientId', nullable: true })
    clientId: string;

    @Column({ type:'varchar', width: 200, name: 'Description', nullable: true })
    description: string;

    @Column({ type:'timestamp', name: 'CreationTime', nullable: false })
    creationTime: Date;

    @Column({ type:'timestamp', name: 'Expiration', nullable: false })
    @Index("IX_DeviceCodes_Expiration")
    expiration: Date;

    @Column({ type:'varchar', width: 4000, name: 'Data', nullable: true })
    data: string;
}