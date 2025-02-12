import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('arieserp_sucursal_domicilio')
export class arieserp_sucursal_domicilio {

    @PrimaryGeneratedColumn()               id:             number;
    @Column('varchar')                      cp:             string;
    @Column('varchar')                      calle:          string;
    @Column('int')                          num_ext:        string;
    @Column('int')                          num_int:        string;
    

    @Column('boolean')                      activo:         boolean;


    
    @Column('int')                          id_sucursal:    number;
    @Column('int')                          id_pais:        number;

}
