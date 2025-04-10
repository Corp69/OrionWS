import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_xml_comprobante_emisor')
export class scorpio_xml_comprobante_emisor{

    @PrimaryGeneratedColumn()                id:                             number;
    @Column('varchar')                       uuid:                           string;
    @Column('varchar')                       rfc:                            string;
    @Column('varchar')                       nombre:                         string;
    @Column('varchar')                       regimenfiscal:                  string;

}