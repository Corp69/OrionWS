import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_proveedor')
export class eccs_proveedor {

    @PrimaryGeneratedColumn()            id:             number;
    @Column('bigint')                    telefono:       number;

    @Column('varchar')                   nombre:         string;
    @Column('varchar')                   primerapellido: string;
    @Column('varchar')                   segundoapellido:string;
    @Column('varchar', { unique: true }) rfc:            string;
    @Column('varchar')                   codigo:         string;
    @Column('varchar')                   correo:         string;
    @Column('varchar')                   banco:          string;
    
    @Column('bigint')                    cuenta:         bigint;
    @Column('bigint')                    clabe:          bigint;

    
    @Column('boolean')                   activo:        boolean;

    @Column('int')                       id_moneda:                 number;
    @Column('int')                       id_sat_usocfdi:            number;
    @Column('int')                       id_sat_regimenfiscal:      number;
    @Column('int')                       id_estatus:                number;
    @Column('int')                       id_tipo_provedor:          number;
  

}

//?Proxima actualización 
//!TODO Analizar la siguiente actualización conversión de empleado a proveedor
// @Column('varchar')                   curp:           string;
// @Column('bigint')                    nss:            bigint;