import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { PalletEntity } from "./pallet.entity";

@Entity('PalletEvent')
export class PalletEventEntity extends BaseEntity {
    @SawtoothIdentity()
    @Transform(x => new Date(x.value))

    @PrimaryColumn({ generated: true, type: 'int', name: 'PkPalletEvent', nullable: false })
    pkPalletEvent: number;

    @Column({ generated: false, type:'timestamp', name: 'EventDateTime', nullable: false })
    eventTime: Date;

    @Column({ type:'numeric', name: 'Temperature', nullable: false })
    temperature: number;

    @Column({ type:'json', name: 'Location', nullable: false })
    location: JSON;

    @Column({ type:'json', name: 'Tilt', nullable: false })
    tilt: JSON;

    @Column({ type:'json', name: 'Shock', nullable: false })
    shock: JSON;

    @SawtoothIdentity()
    @PrimaryColumn({ generated: false, type:'varchar', width: 255, name: 'FkPallet', nullable: false })
    fkPallet: number;

    @ManyToOne((type) => PalletEntity, x => x.palletEvents)
    @JoinColumn({ name: 'FkPallet', referencedColumnName: 'pkPallet' })
    pallet: PalletEntity;
}