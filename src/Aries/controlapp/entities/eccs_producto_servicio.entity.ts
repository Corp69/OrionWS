import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_producto_servicio')
export class eccs_producto_servicio {

    @PrimaryGeneratedColumn()   id:                     number;
    @Column('varchar')          descripcion:            string;
    @Column('varchar')          codigo:                 string;    
    @Column('int')              id_eccs_tipo:           number;
    @Column('int')              id_eccs_clasificacion:  number;
    @Column('int')              id_sat_claveprodserv:   number;
    @Column('int')              id_sat_unidad_aduana:   number;
    @Column('varchar')          codigo_barras:          string;
    @Column('boolean')          activo:                 boolean;
    @Column('int')              id_eccs_estatus:        number;

}
