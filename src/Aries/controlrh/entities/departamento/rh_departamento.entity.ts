import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('rh_departamento')
export class rh_departamento {

    @PrimaryGeneratedColumn()            id:             number;
    
    @Column('varchar')                   descripcion:    string;
    @Column('varchar')                   observaciones:  string;
    @Column('varchar')                   orden:          string; 

    @Column('boolean')                   activo:         boolean;

    @Column('int')                       id_estatus:     number;
  

}
