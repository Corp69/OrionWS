import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_empleado')
export class eccs_empleado {

    @PrimaryGeneratedColumn()            id:                         number;
    @Column('varchar')                   nivelacceso:                number;

    @Column('varchar')                   nombre:                     string;
    @Column('varchar')                   apellidop:                  string;
    @Column('varchar')                   apellidom:                  string;
    @Column('varchar')                   correo_personal:            string;
    @Column('varchar')                   rfc:                        string;
    @Column('varchar')                   curp:                       string;
    @Column('varchar')                   observaciones:              string;

    @Column('bigint')                    clabe:                      number;
    @Column('bigint')                    nss:                        number;
    @Column('bigint')                    cuenta_banco:               number;
    @Column('bigint')                    whatsapp:                   number;
    @Column('bigint')                    telefono:                   number;

    // @Column('varchar')                   email:                      string;  //eliminado de front
    // @Column('varchar')                   password:                   string;  //eliminado de front

    @Column('int')                       id_estatus:                number;
    @Column('int')                       id_sexo:                   number;
    @Column('int')                       id_sat_regimenfiscal:      number;
    @Column('int')                       id_sat_usocfdi:            number;
    @Column('int')                       id_estado_civil:           number;
  

}
//?Proxima actualización 
//!TODO Analizar la siguiente actualización pago directo con banco
// @Column('varchar')                   fecha_nacimiento:           string;
// @Column('varchar')                   correo_usuario:             string;
// @Column('varchar')                   correo_clave:               string;
// @Column('varchar')                   antiguedad:                 string;
// @Column('varchar')                   tipocontrato:               string;