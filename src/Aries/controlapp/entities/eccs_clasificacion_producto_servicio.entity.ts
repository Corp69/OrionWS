import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_clasificacion_producto_servicio')
export class eccs_clasificacion_producto_servicio {

    @PrimaryGeneratedColumn()   id:                     number;
    @Column('varchar')          descripcion:            string;   
    @Column('int')              id_eccs_tipo:           number;
    @Column('int')              id_eccs_estatus:        number;
    @Column('boolean')          activa:                 boolean;

}
