import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('arieserp_sucursal_domicilio')
export class arieserp_sucursal_domicilio {

    @PrimaryGeneratedColumn()               id:             number;
    @Column('varchar')                      cp:             number;
    @Column('varchar')                      calle:          string;
    @Column('boolean')                      activo:         boolean;
    @Column('int')                          num_ext:        number;
    @Column('int')                          num_int:        number;
    @Column('int')                          id_sucursal:    number;
    @Column('int')                          id_pais:        number;

}
