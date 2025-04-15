import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_reportes_vista')
export class eccs_reportes_vista {

    @PrimaryGeneratedColumn()   id:                     number;
    @Column('varchar')          descripcion:            string;
    @Column('varchar')          valor:                  string;  
    
    @Column('int')              id_eccs_aplicacion:     number;
    @Column('int')              id_eccs_modulo:         number;
    @Column('int')              id_eccs_estatus:        number;

    @Column('boolean')          activo:                 boolean;
    
}
