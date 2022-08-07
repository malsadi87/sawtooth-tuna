import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TripEntity } from "./trip.entity";

@Entity('Haul')
export class HaulEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'datetime', name: 'LaunchDateTime', nullable: false })
    launchDateTime: Date;

    @Column({ type:'nvarchar', width: 255, name: 'LaunchPosition', nullable: false })
    launchPosition: string;

    @Column({ type:'double', name: 'LaunchLatitude', nullable: false })
    launchLatitude: number;

    @Column({ type:'double', name: 'LaunchLongitude', nullable: false })
    launchLongitude: number;

    @Column({ type:'datetime', name: 'HaulDateTime', nullable: false })
    haulDateTime: Date;

    @Column({ type:'nvarchar', width: 255, name: 'HaulPosition', nullable: false })
    haulPosition: string;

    @Column({ type:'double', name: 'HaulLatitude', nullable: false })
    haulLatitude: number;

    @Column({ type:'double', name: 'HaulLongitude', nullable: false })
    haulLongitude: number;

    @PrimaryColumn({ generated: false, name: 'TripNo', type: 'int', nullable: false })
    tripNo: number;

    @ManyToOne((type) => TripEntity, x => x.hauls)
    trip: TripEntity;
}