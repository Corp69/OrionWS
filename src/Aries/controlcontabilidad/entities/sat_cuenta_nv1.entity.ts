import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('sat_cuenta_nv1')
export class sat_cuenta_nv1 {

    @PrimaryGeneratedColumn('rowid') id:          string;
    @Column('int')            nivel:       number;
    @Column('varchar')        codigo:      string;
    @Column('varchar')        descripcion: string;
    @Column('boolean')        activa:      boolean;
}