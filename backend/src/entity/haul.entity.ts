import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";
import { TripEntity } from "./trip.entity";
import * as pg from 'pg';

pg.types.setTypeParser(1700, function(val) {
    return parseFloat(val);
});

@Entity('Haul')
export class HaulEntity extends BaseEntity {
    @SawtoothIdentity()
    @Transform(x => new Date(x.value))

    @PrimaryColumn({ generated: true, type: 'int', name: 'PkHaul', nullable: false })
    pkHaul: number;

    @Column({ generated: false, type: 'timestamp', name: 'LaunchDateTime', nullable: false })
    launchDateTime: Date;

    @Column({ type:'varchar', width: 255, name: 'LaunchPosition', nullable: false })
    launchPosition: string;

    @Column({ type:'numeric', name: 'LaunchLatitude', nullable: false })
    launchLatitude: number;

    @Column({ type:'numeric', name: 'LaunchLongitude', nullable: false })
    launchLongitude: number;

    // TODO: Is this x Date value still applicable?
    @Transform(x => new Date(x.value))
    @Column({ type:'timestamp', name: 'HaulDateTime', nullable: false })
    haulDateTime: Date;

    @Column({ type:'varchar', width: 255, name: 'HaulPosition', nullable: false })
    haulPosition: string;

    @Column({ type:'numeric', name: 'HaulLatitude', nullable: false })
    haulLatitude: number;

    @Column({ type:'numeric', name: 'HaulLongitude', nullable: false })
    haulLongitude: number;

    @PrimaryColumn({ generated: false, name: 'FkTrip', type: 'int', nullable: false })
    fkTrip: number;

    @ManyToOne((type) => TripEntity, x => x.hauls)
    @JoinColumn({ name: 'FkTrip', referencedColumnName: 'pkTrip' })
    trip: TripEntity;
}