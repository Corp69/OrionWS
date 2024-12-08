import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class EccsCodigoDTO {
    
    @ApiProperty({
        example: 1,
        description: 'ID: identificador de la empresa dentro de ECCS.',
        uniqueItems: true
    })
    @IsNumber()
    _idempresa: number;

    @ApiProperty({
        example: "XAOXAX",
        description: '_codigo: Codigo de seguridad para ejecutar las actualizaciones.',
        uniqueItems: true
    })
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    _codigo: string;
    
}