import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('scorpio_xml_comprobante_conceptos')
export class scorpio_xml_comprobante_conceptos{

    @PrimaryGeneratedColumn()                id:                             number;
    @Column('int')                           id_scorpio_xml_comprobante:     number;
    @Column('jsonb')                         concepto:                       any;


}