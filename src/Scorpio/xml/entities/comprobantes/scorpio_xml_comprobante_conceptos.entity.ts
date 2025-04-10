import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_xml_comprobante_conceptos')
export class scorpio_xml_comprobante_conceptos{

    @PrimaryGeneratedColumn()                id:                             number;
    @Column('varchar')                       uuid:                           string;
    @Column('jsonb')                         concepto:                       any;


}