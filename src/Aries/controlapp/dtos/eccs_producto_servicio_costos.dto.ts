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

export class Eccs_producto_servicio_costosDto {

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
    example: 25,
    description: 'Costo de la clasificacion producto o servicio.',
  })
  @IsNumber( {},  { message: 'Costo: debe ser Number' })
  @Min(1,   { message: 'El Costo: debe tener almenos 1  caracter.' })
  @Max(9999999999, { message: 'El Costo: no debe exceder a 1000000000 caracteres.' })
  costo: number;

  @ApiProperty({
    example: 25,
    description: 'Descuento de la clasificacion producto o servicio.',
  })
  @IsNumber( {},  { message: 'Descuento: debe ser Number' })
  @Min(1,   { message: 'El Descuento: debe tener almenos 1  caracter.' })
  @Max(999, { message: 'El Descuento: no debe exceder a 100 caracteres.' })
  descuento: number;



  @ApiProperty({
    example: 1,
    description: 'id_eccs_usuario: hace referencia al usuario.',
  })
  @IsNumber({}, { message: 'El id_eccs_usuario debe ser un número.' })
  @Min(1,       { message: 'El id_eccs_usuario: debe tener al menos 1.' })
  @Max(10,      { message: 'El id_eccs_usuario: no debe tener más de 10.' })
  id_eccs_usuario: number;
  
  @ApiProperty({
    example: 1,
    description: 'id_eccs_proveedor: hace referencia al usuario.',
  })
  @IsNumber({}, { message: 'El id_eccs_proveedor debe ser un número.' })
  @Min(1,       { message: 'El id_eccs_proveedor: debe tener al menos 1.' })
  @Max(10,      { message: 'El id_eccs_proveedor: no debe tener más de 10.' })
  id_eccs_proveedor: number;

  @ApiProperty({
    example: 1,
    description: 'id_eccs_estatus: asigna el valor 1 activo etc.',
  })
  @IsNumber({}, { message: 'El id_eccs_estatus debe ser un número.' })
  @Min(1,       { message: 'El id_eccs_estatus: debe tener al menos 1.' })
  @Max(100,     { message: 'El id_eccs_estatus: no debe tener más de 100.' })
  id_eccs_estatus: number;
  
  @ApiProperty({
    example: 1,
    description: 'id_eccs_producto_servicio: hace referencia a 1 prodcuto 2 servicio.',
  })
  @IsNumber({}, { message: 'El id_eccs_producto_servicio debe ser un número.' })
  @Min(1,       { message: 'El id_eccs_producto_servicio: debe tener al menos 1.' })
  @Max(10,      { message: 'El id_eccs_producto_servicio: no debe tener más de 10.' })
  id_eccs_producto_servicio: number;
  
  @ApiProperty({
    example: 1,
    description: 'id_arieserp_sucursal: hace referencia a la sucursal.',
  })
  @IsNumber({}, { message: 'El id_arieserp_sucursal debe ser un número.' })
  @Min(1,       { message: 'El id_arieserp_sucursal: debe tener al menos 1.' })
  @Max(10,      { message: 'El id_arieserp_sucursal: no debe tener más de 10.' })
  id_arieserp_sucursal: number;



  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activo: boolean;

  
}