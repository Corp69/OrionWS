import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_xml_comprobante_complemento')
export class scorpio_xml_comprobante_complemento{

    @PrimaryGeneratedColumn()                id:                             number;
    @Column('varchar')                       uuid:                           string;
    @Column('jsonb')                         timbrefiscaldigital:            any;


}