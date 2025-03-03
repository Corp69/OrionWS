import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('sat_cuenta_nv2')
export class sat_cuenta_nv2 {

    @PrimaryGeneratedColumn('rowid') id:          string;
    @Column('int')            nivel:       number;
    @Column('varchar')        id_sat_cuenta_nv1: string;
    @Column('varchar')        codigo:      string;
    @Column('varchar')        descripcion: string;
    @Column('boolean')        activa:      boolean;

}