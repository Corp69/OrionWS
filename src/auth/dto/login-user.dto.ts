import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        example: "eccs",
        description: 'Usario: identificador Usuario para acceder a la empresa de forma individual.',
        uniqueItems: true
    })
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    usuario: string;

    @ApiProperty({
        example: "Eccs4",
        description: 'Pass: identificador contraseña para acceder.',
        uniqueItems: true
    })
    @IsString()
    @MinLength(4)
    @MaxLength(15)
    // @Matches(
    //     /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: 'La contraseña debe tener a un caracter mayuscula, minuscula y un numero'
    // })
    pass: string;
    
}