import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_cliente')
export class eccs_cliente {

    @PrimaryGeneratedColumn()            id:            number;
    @Column('varchar', { unique: true }) nombre:        string;
    @Column('varchar', { unique: true }) rfc:           string;
    @Column('varchar')                   curp:          string;
    @Column('bigint')                    telefono:      number;
    @Column('varchar')                   codigo:        string;
    @Column('varchar')                   correo:        string;
    
    @Column('boolean')                   activo:        boolean;

    @Column('int')                       id_moneda:                 number;
    @Column('int')                       id_sat_usocfdi:            number;
    @Column('int')                       id_sat_regimenfiscalcfdi:  number;
    @Column('int')                       id_estatus:                number;
    @Column('int')                       id_tipo_cliente:           number;
  

}