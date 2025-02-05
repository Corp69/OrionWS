import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_empleado')
export class eccs_empleado {

    @PrimaryGeneratedColumn()            id:                         number;
    @Column('varchar')                   nombre:                     string;
    @Column('varchar')                   apellidop:                  string;
    @Column('varchar')                   apellidom:                  string;
    @Column('varchar')                   correo_personal:            string;
    @Column('varchar')                   nss:                        number;
    @Column('varchar')                   rfc:                        string;
    @Column('varchar')                   curp:                       string;
    @Column('varchar')                   fecha_nacimiento?:          string;
    @Column('varchar')                   correo_usuario:             string;
    @Column('varchar')                   correo_clave:               string;
    @Column('varchar')                   cuenta_banco:               string;
    @Column('varchar')                   clabe:                      number;
    @Column('varchar')                   whatsapp:                   number;
    @Column('varchar')                   observaciones:              string;
    @Column('varchar')                   antiguedad:                 string;
    @Column('varchar')                   tipocontrato:               string;
    @Column('varchar')                   telefono:                   number;
    @Column('varchar')                   nivelacceso:                number;
    @Column('varchar')                   email:                      string;
    @Column('varchar')                   password:                   string;

    @Column('int')                       id_estatus:                number;
    @Column('int')                       id_sexo:                   number;
    @Column('int')                       id_sat_regimenfiscal:      number;
    @Column('int')                       id_sat_usocfdi:            number;
    @Column('int')                       id_estado_civil:           number;
  

}