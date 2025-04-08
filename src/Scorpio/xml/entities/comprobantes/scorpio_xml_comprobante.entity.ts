import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_xml_comprobante')
export class scorpio_xml_comprobante {

    @PrimaryGeneratedColumn()                id:                      number;
    @Column('int')                           id_xml_scorpio_tipo:     number;
    @Column('varchar', {unique:true})        uuid:                    string;
    @Column('varchar')                       fechatimbrado:           string;
    @Column('varchar')                       cfdi:                    string;
    @Column('varchar')                       xsi:                     string;
    @Column('varchar')                       schemalocation:          string;
    @Column('varchar')                       fecha:                   string;
    @Column('varchar')                       sello:                   string;
    @Column('varchar')                       formapago:               string;
    @Column('varchar')                       nocertificado:           string;
    @Column('varchar')                       certificado:             string;
    @Column('varchar')                       subtotal:                string;
    @Column('varchar')                       moneda:                  string;
    @Column('varchar')                       total:                   string;
    @Column('varchar')                       tipodecomprobante:       string;
    @Column('varchar')                       exportacion:             string;
    @Column('varchar')                       metodopago:              string;
    @Column('varchar')                       lugarexpedicion:         string;


}