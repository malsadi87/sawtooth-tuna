import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { PalletEntity } from "./pallet.entity";

@Entity('PalletEvent')
export class PalletEventEntity extends BaseEntity {
    @SawtoothIdentity()
    @Transform(x => new Date(x.value))
    @PrimaryColumn({ generated: false, type:'timestamp', name: 'EventTime', nullable: false })
    eventTime: Date;

    @SawtoothIdentity()
    @PrimaryColumn({ generated: false, type:'varchar', width: 255, name: 'PalletNum', nullable: false })
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
    @JoinColumn({ name: 'PalletNum', referencedColumnName: 'palletNum' })
    pallet: PalletEntity;
}