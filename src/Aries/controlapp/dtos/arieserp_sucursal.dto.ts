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

export class SucursalDTO {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador de la sucursal dentro de AriesERP',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Venta de Lentes',
    description: 'Descripción de la sucursal.',
  })
  @IsString({ message: 'Descripción: debe ser String' })
  @MinLength(10, { message: 'El Descripción debe tener al menos 10 caracteres.' })
  @MaxLength(100, { message: 'El Descripción no debe exceder a 100 digitos.' })
  descripcion: string;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador del estado actual de la sucursal',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(10,      { message: 'id_estatus: no debe tener más de 10.' })
  id_estatus: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador del la empresa actual de la sucursal',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus: no debe tener más de 99.' })
  id_empresa: number;

  
}
