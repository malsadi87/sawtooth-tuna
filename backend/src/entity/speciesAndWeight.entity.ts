import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SawtoothIdentity } from "../app/utility/decorator/sawtooth-Identity.decorator";

@Entity('SpeciesAndWeight')
export class SpeciesAndWeightEntity extends BaseEntity {
    @SawtoothIdentity()
    @PrimaryGeneratedColumn('increment', { name: 'SpeciesId' })
    speciesId: number;

    @Column({ type:'int', name: 'Quantity', nullable: false })
    quantity: number;

    @Column({ type:'int', name: 'Species', nullable: false })
    species: number;

    @Column({ type:'varchar', width: 255, name: 'CatchPackageId', nullable: false })
    catchPackageId: string;

    @Transform(x => new Date(x.value))
    @Column({ type:'timestamp', name: 'LaunchDateTime', nullable: true })
    launchDateTime: Date;
}