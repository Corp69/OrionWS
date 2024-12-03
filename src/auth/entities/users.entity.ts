import { 
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_usuarios')
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')                       id_eccs_status:     number;
    @Column('int')                       id_eccs_empresa:    number;
    @Column('varchar', { unique: true }) usuario:            string;
    @Column('varchar')                   pass:               string;

}
