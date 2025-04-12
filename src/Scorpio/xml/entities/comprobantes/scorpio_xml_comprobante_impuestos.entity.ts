import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_xml_comprobante_impuestos')
export class scorpio_xml_comprobante_impuestos{

    @PrimaryGeneratedColumn()                id:                             number;
    @Column('int')                           id_scorpio_xml_comprobante:     number;
    @Column('varchar')                       uuid:                           string;
    @Column('varchar')                       totalimpuestostrasladados:      string;
    @Column('jsonb')                         traslados:                      any;


}