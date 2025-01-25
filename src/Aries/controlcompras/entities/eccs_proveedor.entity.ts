import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_proveedor')
export class eccs_proveedor {

    @PrimaryGeneratedColumn()            id:             number;
    @Column('varchar', { unique: true }) nombre:         string;
    @Column('varchar', { unique: true }) primerapellido: string;
    @Column('varchar', { unique: true }) segundoapellido:string;
    @Column('varchar', { unique: true }) rfc:            string;
    @Column('varchar')                   curp:           string;
    @Column('varchar')                   codigo:         string;
    @Column('varchar')                   nss:            string;
    @Column('varchar')                   banco:          string;
    @Column('varchar')                   cuenta:         string;
    @Column('varchar')                   clabe:          string;

    
    @Column('boolean')                   activo:        boolean;

    @Column('int')                       id_moneda:                 number;
    @Column('int')                       id_sat_usocfdi:            number;
    @Column('int')                       id_sat_regimenfiscal:      number;
    @Column('int')                       id_estatus:                number;
    @Column('int')                       id_tipo_provedor:          number;
  

}