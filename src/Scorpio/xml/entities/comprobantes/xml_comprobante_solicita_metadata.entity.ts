import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('xml_comprobante_solicita_metadata')
export class xml_comprobante_solicita_metadata {

    @PrimaryGeneratedColumn()            id:                      number;
    @Column('varchar', { unique: true }) tipopeticion:            string;
    @Column('varchar')                   fechaincio:              string;
    @Column('varchar')                   fechafin:                string;
    @Column('int')                       montominimo:             number;
    @Column('int')                       montomaximo:             number;
    @Column('int')                       id_empresa:              number;
    @Column('int')                       id_estatus:              number;
    @Column('int')                       activo:                  boolean;


}