import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_proveedor_domicilio')
export class eccs_proveedor_domicilio {

    @PrimaryGeneratedColumn()            id:                        number;
    @Column('varchar')                   cp:                        string;
    @Column('varchar')                   calle:                     string;
    @Column('varchar')                   num_ext:                   string;
    @Column('varchar')                   num_int:                   string;
 
    @Column('boolean')                   activo:                    boolean;

    @Column('int')                       id_eccs_proveedor:         number;
    @Column('int')                       id_pais:                   number;
    @Column('int')                       id_estatus:                number;
  

}