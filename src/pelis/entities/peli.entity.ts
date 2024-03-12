import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn  } from "typeorm";


@Entity()
export class Peli {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    duracion: number;
    @Column()
    genero: string;

    @Column({ default: false })
    pendiente: boolean;

    @Column({ default: false })
    favorita: boolean;
    
    @DeleteDateColumn()
    deletedAt: Date;
}
