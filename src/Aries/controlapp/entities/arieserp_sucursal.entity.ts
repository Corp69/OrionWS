import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('arieserp_sucursal')
export class arieserp_sucursal {

    @PrimaryGeneratedColumn()            id:                      number;
    @Column('varchar')                   descripcion:             string;
    @Column('boolean')                   activo:                  boolean;
    @Column('int')                       id_estatus:              number;
    @Column('int')                       id_empresa:              number;

}