import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_xml_comprobante_receptor')
export class scorpio_xml_comprobante_receptor{

    @PrimaryGeneratedColumn()                id:                             number;
    @Column('varchar')                       uuid:                           string;
    @Column('varchar')                       rfc:                            string;
    @Column('varchar')                       nombre:                         string;
    @Column('varchar')                       domiciliofiscalreceptor:        string;
    @Column('varchar')                       regimenfiscalreceptor:          string;
    @Column('varchar')                       usocfdi:                        string;


}