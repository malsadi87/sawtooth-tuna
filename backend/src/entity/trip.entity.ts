import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { HaulEntity } from "./haul.entity";
import { Transform } from 'class-transformer';
import { SawtoothIdentity } from "../app/utility/decorator/sawtoothIdentity.decorator";

@Entity({ name: 'Trip' })
export class TripEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryColumn({ generated: true, type: 'int', name: 'PkTrip', nullable: false })
    pkTrip: number;

    @Column({ type:'int', name: 'TripWithinYearNo', nullable: false })
    tripWithinYearNo: number;

    @Column({ type:'varchar', width: 255, name: 'VesselName' })
    vesselName: string;

    @Transform(x => new Date(x.value))
    @Column({ type:'timestamp', name: 'DepartureDate', nullable: false })
    departureDate: Date;

    @Column({ type:'varchar', width: 255, name: 'DeparturePort', nullable: false })
    departurePort: string;

    @Transform(x => new Date(x.value))
    @Column({ type:'timestamp', name: 'LandingDate', nullable: false })
    landingDate: Date;

    @Column({ type:'varchar', width: 255, name: 'LandingPort', nullable: false })
    landingPort: string;

    @OneToMany((type) => HaulEntity, (x) => x.trip)
    @JoinColumn({ referencedColumnName: 'pkTrip' })
    hauls: HaulEntity[];
}