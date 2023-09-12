import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.model";

@Entity()
export class Build {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    number_of_flats: number
    
    @Column({nullable:true})
    flats: number

    @Column({nullable:true})
    floor: number

    @Column({default:'kiracı'})
    isStatus: string

    @ManyToMany(() => Person, (person) => person.builds)
    @JoinTable()
    persons: Person[];

}