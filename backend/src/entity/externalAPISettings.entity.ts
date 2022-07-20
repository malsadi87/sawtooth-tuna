import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('ExternalAPISettings')
export class ExternalAPISettingsEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'bigint', name: 'Id', nullable: false })
    id: number;

    @Column({ type:'varchar', width: 512, name: 'ClientId', nullable: true })
    clientId: string;

    @Column({ type:'varchar', width: 512, name: 'ClientSecret', nullable: true })
    clientSecret: string;

    @Column({ type:'varchar', width: 512, name: 'OAuthAuthorizationURL', nullable: true })
    oAuthAuthorizationURL: string;

    @Column({ type:'varchar', width: 512, name: 'OAuthTokenURL', nullable: true })
    oAuthTokenURL: string;

    @Column({ type:'varchar', width: 512, name: 'RedirectionURL', nullable: true })
    redirectionURL: string;

    @Column({ type:'smallint', name: 'Provider', nullable: false })
    provider: number;

    @Column({ type:'datetime', name: 'Created', nullable: false })
    created: Date;

    @Column({ type:'varchar', width: 512, name: 'CreatedBy', nullable: true })
    createdBy: string;
    
    @Column({ type:'datetime', name: 'LastModified', nullable: true })
    lastModified: Date;

    @Column({ type:'varchar', width: 512, name: 'LastModifiedBy', nullable: true })
    lastModifiedBy: string;
}