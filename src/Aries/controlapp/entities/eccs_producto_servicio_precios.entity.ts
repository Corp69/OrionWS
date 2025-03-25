import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_producto_servicio_precios')
export class eccs_producto_servicio_precios {

    @PrimaryGeneratedColumn()   id:                             number;
    @Column('varchar')          descripcion:                    string;   
    @Column('int')              precio:                         number;
    @Column('int')              id_eccs_usuario:                number;
    @Column('int')              id_eccs_estatus:                number;
    @Column('int')              id_eccs_producto_servicio:      number;
    @Column('int')              id_arieserp_sucursal:           number;
    @Column('boolean')          activo:                         boolean;

}
