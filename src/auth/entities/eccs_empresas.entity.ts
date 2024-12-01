import { 
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('eccs_empresas')
export class eccs_empresas {

    @PrimaryGeneratedColumn() id:               number;
    @Column('int') id_eccs_status:              number;
    @Column('varchar', { unique: true }) rfc:   string;
    @Column('varchar')  nombre_comercial:       string;
    @Column('varchar')  ext_tel:                string;
    @Column('bigint') telefono:                 number;
    @Column('varchar')  correo:                 string;
    //? Acciones antes del Insert 
    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.correo = this.correo.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
