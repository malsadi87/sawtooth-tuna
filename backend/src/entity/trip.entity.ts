import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { HaulEntity } from "./haul.entity";
import { PalletEntity } from "./pallet.entity";

@Entity('trip')
export class TripEntity extends BaseEntity {
    @PrimaryColumn({ generated: false, type: 'int', name: 'TripNo', nullable: false })
    tripNo: number;

    @Column({ type:'int', name: 'TripWithinYearNo', nullable: false })
    tripWithinYearNo: number;

    @Column({ type:'nvarchar', width: 255, name: 'VesselName' })
    vesselName: string;

    @Column({ type:'datetime', name: 'DepartureDate', nullable: false })
    departureDate: Date;

    @Column({ type:'nvarchar', width: 255, name: 'DeparturePort', nullable: false })
    departurePort: string;

    @Column({ type:'datetime', name: 'LandingDate', nullable: false })
    landingDate: Date;

    @Column({ type:'nvarchar', width: 255, name: 'LandingPort', nullable: false })
    landingPort: string;

    @OneToMany((type) => HaulEntity, (x) => x.tripNo)
    @JoinColumn({ referencedColumnName: 'TripNo' })
    hauls: HaulEntity[];

    @OneToMany((entity) => PalletEntity, (x) => x.tripNo)
    @JoinColumn({ referencedColumnName: 'TripNo' })
    pallets: PalletEntity[];
}