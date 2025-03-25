import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_producto_servicio_costos')
export class eccs_producto_servicio_costos {

    @PrimaryGeneratedColumn()   id:                             number;
    @Column('varchar')          descripcion:                    string;   
    @Column('int')              costo:                          number;
    @Column('int')              descuento:                      number;
    @Column('int')              id_eccs_usuario:                number;
    @Column('int')              id_eccs_proveedor:              number;
    @Column('int')              id_eccs_estatus:                number;
    @Column('int')              id_eccs_producto_servicio:      number;
    @Column('int')              id_arieserp_sucursal:           number;
    @Column('boolean')          activo:                         boolean;

}
