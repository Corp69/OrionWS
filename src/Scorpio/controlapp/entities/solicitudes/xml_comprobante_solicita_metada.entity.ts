import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('xml_comprobante_solicita_metada')
export class xml_comprobante_solicita_metada {

    @PrimaryGeneratedColumn()            id:                      number;
    @Column('varchar')                   tipopeticion:            string;
    @Column('varchar')                   fechainicio:             string;
    @Column('varchar')                   fechafin:                string;
    @Column('int')                       montominimo:             number;
    @Column('int')                       montomaximo:             number;
    @Column('int')                       id_empresa:              number;
    @Column('int')                       id_estatus:              number;
    @Column('boolean')                   activo:                  boolean;


}