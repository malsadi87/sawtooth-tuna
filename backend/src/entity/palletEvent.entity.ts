import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PalletEntity } from "./pallet.entity";

@Entity('PalletEvent')
export class PalletEventEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type:'datetime', name: 'EventTime', nullable: false })
    eventTime: Date;

    @PrimaryColumn({ generated: false, type:'nvarchar', width: 255, name: 'PalletNum', nullable: false })
    palletNum: string;

    @Column({ type:'json', name: 'Temperature', nullable: false })
    temperature: JSON;

    @Column({ type:'json', name: 'Location', nullable: false })
    location: JSON;

    @Column({ type:'json', name: 'Tilt', nullable: false })
    tilt: JSON;

    @Column({ type:'json', name: 'Shock', nullable: false })
    shock: JSON;

    @ManyToOne((type) => PalletEntity, x => x.palletEvenets)
    pallet: PalletEntity;
}