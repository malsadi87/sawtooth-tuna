import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TripEntity } from "./trip.entity";

@Entity('Haul')
export class HaulEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'timestamp', name: 'LaunchDateTime', nullable: false })
    launchDateTime: Date;

    @Column({ type:'varchar', width: 255, name: 'LaunchPosition', nullable: false })
    launchPosition: string;

    @Column({ type:'numeric', precision: 8, scale: 6, name: 'LaunchLatitude', nullable: false })
    launchLatitude: number;

    @Column({ type:'numeric', precision: 8, scale: 6, name: 'LaunchLongitude', nullable: false })
    launchLongitude: number;

    @Column({ type:'timestamp', name: 'HaulDateTime', nullable: false })
    haulDateTime: Date;

    @Column({ type:'varchar', width: 255, name: 'HaulPosition', nullable: false })
    haulPosition: string;

    @Column({ type:'numeric', name: 'HaulLatitude', nullable: false })
    haulLatitude: number;

    @Column({ type:'numeric', precision: 8, scale: 6, name: 'HaulLongitude', nullable: false })
    haulLongitude: number;

    @PrimaryColumn({ generated: false, name: 'TripNo', type: 'int', nullable: false })
    tripNo: number;

    @ManyToOne((type) => TripEntity, x => x.hauls)
    trip: TripEntity;
}