import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class EccsDTO {
    
    @ApiProperty({
        example: 1,
        description: 'ID: identificador de la empresa dentro de ECCS.',
        uniqueItems: true
    })
    @IsNumber()
    _idempresa: number;
    
}