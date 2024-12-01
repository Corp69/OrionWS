import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateEccsEmpresasDto {

    @ApiProperty({
        example: 1,
        description: 'ID: identificador unico e irepetible de cada registro.',
        uniqueItems: true
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        example: 4,
        description: 'id_eccs_status: Estatus del cliente. Default 4 ( En proceso )',
    })
    @IsNumber()
    id_eccs_status: number;

    @ApiProperty({
        example: 'XAXX010101000',
        description: 'RFC: De la empresa que es un posible prospecto a cliente.',
        uniqueItems: true
    })
    @MinLength(2)
    @MaxLength(15)
    @IsString()
    rfc: string;
    
    @ApiProperty({
        example: 'ECCS',
        description: 'Nombre: Nombre comercial de la empresa o posible prospecto.',
        uniqueItems: true
    })
    @IsString()
    nombre_comercial: string;

    @ApiProperty({
        example: '+52',
        description: 'Ext: extension de numero telefonico'
    })
    @MaxLength(5)
    @IsString()
    ext_tel: string;

    @ApiProperty({
        example: 4651068560,
        description: 'Teléfono: Número de teléfono del prospecto. Debe tener exactamente 10 dígitos.',
      })
      @IsNumber({}, { message: 'El teléfono debe ser un número.' })
      @Min(1000000000, { message: 'El teléfono debe tener al menos 10 dígitos.' })
      @Max(9999999999, { message: 'El teléfono no debe tener más de 10 dígitos.' })
      telefono: number;


    @ApiProperty({
        example: 'test@eccs.com.mx',
        description: 'EMAIL: Correo electronico del prospecto'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(30)
    @IsEmail()
    correo: string;
    


}

