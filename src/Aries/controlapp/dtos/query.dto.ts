import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class querydto{

    @IsNumber()
    @ApiProperty({
    example: 1,
    description:
        'ID: identificador unico',
    uniqueItems: true,
    })
    id: number;


    @ApiProperty({
        example: 'mundo',
        description: 'hola mundo',
    })
    @IsString({ message: 'valor: debe ser String' })
    @MinLength(5, { message: 'El valor debe tener al menos 5 caracteres.' })
    @MaxLength(1500, { message: 'El valor no debe exceder a 1500 caracteres.' })
    valor: string;

}