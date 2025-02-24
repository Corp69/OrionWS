import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_empleado_domicilio')
export class eccs_empleado_domicilio {

    @PrimaryGeneratedColumn()            id:                        number;
    @Column('varchar')                   cp:                        string;
    @Column('varchar')                   calle:                     string;
    @Column('varchar')                   num_ext:                   string;
    @Column('varchar')                   num_int:                   string;
 
    @Column('boolean')                   activo:                    boolean;

    @Column('int')                       id_eccs_empleado:          number;
    @Column('int')                       id_pais:                   number;
    @Column('int')                       id_estatus:                number;

  

}