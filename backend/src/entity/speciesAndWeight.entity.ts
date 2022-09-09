import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('SpeciesAndWeight')
export class SpeciesAndWeightEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { name: 'SpeciesId' })
    speciesId: number;

    @Column({ type:'int', name: 'Quantity', nullable: false })
    quantity: number;

    @Column({ type:'int', name: 'Species', nullable: false })
    species: number;

    @Column({ type:'varchar', width: 255, name: 'CatchPackageId', nullable: false })
    catchPackageId: string;

    @Column({ type:'timestamp', name: 'LaunchDateTime', nullable: true })
    launchDateTime: Date;
}