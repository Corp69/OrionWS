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

export class DomicilioSucursalDTO {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador de la sucursal dentro de AriesERP',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: '20500',
    description: 'codigo postal del domicilio del proveedor.',
    uniqueItems: true,
  })
  // @IsString({ message: 'nombre: debe ser String' })
  @MinLength(5, { message: 'El cp debe tener al menos 5 caracteres.' })
  @MaxLength(6, { message: 'El cp no debe exceder a 5 digitos.' })
  cp: string;

  @ApiProperty({
    example: 'Tuitlan',
    description: 'Nombre de la calle.',
  })
  @IsString({ message: 'Calle: debe ser String' })
  @MinLength(3, { message: 'Calle debe tener al menos 3 caracteres.' })
  @MaxLength(20, { message: 'Calle no debe exceder a 20 caracteres.' })
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
  @IsString({ message: 'correo_personal: debe ser String' })
  @MaxLength(4, { message: 'correo_personal no debe exceder a 3 digitos.' })
  num_int: string;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la sucursal',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(10,      { message: 'id_estatus: no debe tener más de 10.' })
  id_sucursal: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador del país',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus: no debe tener más de 99.' })
  id_pais: number;


}
