import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_empresa')
export class scorpio_empresa {

    @PrimaryGeneratedColumn()            id:                      number;
    @Column('varchar', { unique: true }) rfc:                     string;
    @Column('varchar')                   pass:                    string;
    @Column('varchar')                   observaciones:           string;
    @Column('varchar')                   nombrecomercial:         string;
    @Column('varchar')                   aviso_privacidad:        string;
    @Column('int')                       id_sat_usocfdi:          number;
    @Column('int')                       id_sat_regimenfiscal:    number;
    @Column('int')                       id_estatus:              number;
    @Column('varchar')                   celular:                 string;
    @Column('int')                       maxcomprobantesmensual:  number;

}