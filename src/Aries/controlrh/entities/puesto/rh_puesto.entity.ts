import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('rh_puesto')
export class rh_puesto {

    @PrimaryGeneratedColumn()            id:                    number;
    @Column('int')                       id_rh_departamento:    number;

    @Column('varchar')                   descripcion:           string;
    @Column('varchar')                   observaciones:         string;
    @Column('varchar')                   orden:                 string; 

    @Column('boolean')                   activo:                boolean;

    @Column('int')                       id_estatus:            number;
  

}
