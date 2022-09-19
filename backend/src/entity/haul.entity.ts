import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { TripEntity } from "./trip.entity";

@Entity('Haul')
export class HaulEntity extends BaseEntity {
    @SawtoothIdentity()
    @Transform(x => new Date(x.value))

    @PrimaryColumn({ generated: true, type: 'int', name: 'HaulId', nullable: false })
    haulId: number;

    @Column({ generated: false, type: 'timestamp', name: 'LaunchDateTime', nullable: false })
    launchDateTime: Date;

    @Column({ type:'varchar', width: 255, name: 'LaunchPosition', nullable: false })
    launchPosition: string;

    @Column({ type:'numeric', precision: 20, scale: 18, name: 'LaunchLatitude', nullable: false })
    launchLatitude: number;

    @Column({ type:'numeric', precision: 20, scale: 18, name: 'LaunchLongitude', nullable: false })
    launchLongitude: number;

    @Transform(x => new Date(x.value))
    @Column({ type:'timestamp', name: 'HaulDateTime', nullable: false })
    haulDateTime: Date;

    @Column({ type:'varchar', width: 255, name: 'HaulPosition', nullable: false })
    haulPosition: string;

    @Column({ type:'numeric', precision: 20, scale: 18, name: 'HaulLatitude', nullable: false })
    haulLatitude: number;

    @Column({ type:'numeric', precision: 20, scale: 18, name: 'HaulLongitude', nullable: false })
    haulLongitude: number;

    @PrimaryColumn({ generated: false, name: 'TripNo', type: 'int', nullable: false })
    tripNo: number;

    @ManyToOne((type) => TripEntity, x => x.hauls)
    @JoinColumn({ name: 'TripNo', referencedColumnName: 'tripNo' })
    trip: TripEntity;
}