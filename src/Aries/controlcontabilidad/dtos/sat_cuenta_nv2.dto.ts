import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class Sat_cuenta_nv2DTO {

  @IsString()
  @ApiProperty({
    example: "100-10-1-10",
    description:
      'id: identificador unico de la cuenta.',
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    example: 0,
    description: 'Nivel: 0,1,2,3,4,5,6,7 dende del nivel de cuenta madre del SAT.',
  })
  @IsNumber({},  { message: 'codigo: debe ser Numerico' })
  @Min(0,        { message: 'codigo: debe tener al menos 0.' })
  @Max(10,       { message: 'codigo: no debe exceder la cantidad de 10.' })
  nivel: number;
  
  @ApiProperty({
    example: "1-1-2-3-1-0",
    description: 'codigo: referencia dentro del catalogo del SAT.',
  })
  @IsString({      message: 'id_sat_cuentanv1: debe ser string' })
  @MinLength(0,  { message: 'id_sat_cuentanv1: debe tener al menos 0 caracteres .' })
  @MaxLength(20, { message: 'id_sat_cuentanv1: no debe exceder la cantidad de 20 caracteres.' })
  id_sat_cuentanv1: string;

  @ApiProperty({
    example: "1-1-2-3-1-0",
    description: 'codigo: referencia dentro del catalogo del SAT.',
  })
  @IsString({ message: 'codigo: debe ser string' })
  @MinLength(0,  { message: 'codigo: debe tener al menos 0 caracteres .' })
  @MaxLength(20, { message: 'codigo: no debe exceder la cantidad de 20 caracteres.' })
  codigo: string;


  @ApiProperty({
    example: "Activos a corto plazo",
    description: "descripcion dentro del catalogo cuentas del SAT",
  })
  @IsString({ message: 'codigo: debe ser string' })
  @MinLength(0,  { message: 'codigo: debe tener al menos 0 caracteres .' })
  @MaxLength(20, { message: 'codigo: no debe exceder la cantidad de 20 caracteres.' })
  descripcion: string;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activa: boolean;
    
}
