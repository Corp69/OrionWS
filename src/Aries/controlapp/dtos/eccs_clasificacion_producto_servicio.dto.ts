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

export class Eccs_clasificacion_producto_servicioDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador de la  clasificacion de producto servicio de AriesERP',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Producto Generico X',
    description: 'Descripción de la clasificacion producto o servicio.',
  })
  @IsString(      { message: 'Descripción: debe ser String' })
  @MinLength(3,   { message: 'El Descripción: debe tener almenos 3  caracteres.' })
  @MaxLength(100, { message: 'El Descripción: no debe exceder a 100 caracteres.' })
  descripcion: string;


  @ApiProperty({
    example: 1,
    description: 'id_eccs_tipo: hace referencia a 1 prodcuto 2 servicio.',
  })
  @IsNumber({}, { message: 'El id_eccs_tipo debe ser un número.' })
  @Min(1,       { message: 'El id_eccs_tipo: debe tener al menos 1.' })
  @Max(10,      { message: 'El id_eccs_tipo: no debe tener más de 10.' })
  id_eccs_tipo: number;

  @ApiProperty({
    example: 1,
    description: 'id_eccs_estatus: asigna el valor 1 activo etc.',
  })
  @IsNumber({}, { message: 'El id_eccs_estatus debe ser un número.' })
  @Min(1,       { message: 'El id_eccs_estatus: debe tener al menos 1.' })
  @Max(100,     { message: 'El id_eccs_estatus: no debe tener más de 100.' })
  id_eccs_estatus: number;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activa: boolean;

  
}
