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

export class DomicilioProveedorDTO {


  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador Unico del proveedor', 
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 20500,
    description: 'codigo postal del domicilio del proveedor.',
    uniqueItems: true,
  })
  // @IsString({ message: 'nombre: debe ser String' })
  @Min(1111, { message: 'El cp: debe tener al menos 4 caracteres.' })
  @Max(99999, { message: 'El cp: no debe exceder a 5 digitos.' })
  cp: number;


  @ApiProperty({
    example: 'Tuitlan',
    description: 'Calle del domicilio del proveedor.',
  })
  @IsString({ message: 'calle: debe ser String' })
  @MinLength(3, { message: 'La calle debe tener al menos 3 caracteres.' })
  @MaxLength(20, { message: 'La calle no debe exceder a 20 caracteres.' })
  calle: string;


  @ApiProperty({
    example: '138',
    description: 'Numero exterior del domicilio del proveedor.',
  })
  @IsString({ message: 'num_ext: debe ser String' })
  @MinLength(1, { message: 'El num_ext debe tener al menos 1 digito.' })
  @MaxLength(6, { message: 'El num_ext no debe exceder a 5 digitos.' })
  num_ext: string;

  @ApiProperty({
    example: '12',
    description: 'Numero interior del domicilio del proveedor.',
  })
  @IsString({ message: 'num_int: debe ser String' })
  @MaxLength(4, { message: 'num_int no debe exceder a 3 digitos.' })
  num_int: string;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador del proveedor',
  })
  @IsNumber({}, { message: 'El id_eccs_proveedor debe ser un número.' })
  @Min(1,       { message: 'id_eccs_proveedor: debe tener al menos 1.' })
  @Max(99,      { message: 'id_eccs_proveedor: no debe tener más de 99.' })
  id_eccs_proveedor: number;

  @ApiProperty({
    example: 1,
    description: 'Sexo: identificador del pais del proveedor',
  })
  @IsNumber({}, { message: 'El id_pais debe ser un número.' })
  @Min(1,       { message: 'id_pais: debe tener al menos 1.' })
  @Max(200,      { message: 'id_pais: no debe tener más de 200.' })
  id_pais: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador del estado del proveedor',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus no debe tener más de 99.' })
  id_estatus: number;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activo: boolean;



}
