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

export class Eccs_producto_servicioDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador del producto servicio de AriesERP',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Producto Generico X',
    description: 'Descripción del producto o servicio.',
  })
  @IsString(      { message: 'Descripción: debe ser String' })
  @MinLength(3,   { message: 'El Descripción: debe tener almenos 3  caracteres.' })
  @MaxLength(100, { message: 'El Descripción: no debe exceder a 100 caracteres.' })
  descripcion: string;

  @ApiProperty({
    example: 'producto001232',
    description: 'codigo: codigo de identificacion del producto.',
  })
  @IsString(      { message: 'codigo: debe ser String' })
  codigo: string;


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
    description: 'id_eccs_clasificacion: clasifica el poducto para hacer un filtro dentro de la app .',
  })
  @IsNumber({},   { message: 'El id_eccs_clasificacion debe ser un número.' })
  @Min(1,         { message: 'El id_eccs_clasificacion: debe tener al menos 1.' })
  @Max(1000,      { message: 'El id_eccs_clasificacion: no debe tener más de 1000.' })
  id_eccs_clasificacion: number;

  @ApiProperty({
    example: 1,
    description: 'id_sat_claveprodserv: asigna el valor dentro del catalogo del SAT para ver el serivicio o codigo al que pertenece.',
  })
  @IsNumber({},   { message: 'El id_sat_claveprodserv debe ser un número.' })
  id_sat_claveprodserv: number;
  
  @ApiProperty({
    example: 1,
    description: 'id_sat_unidad_aduana: asigna el valor dentro del catalogo del SAT para ver la equivalencia del catalogo.',
  })
  @IsNumber({},   { message: 'El id_sat_unidad_aduana debe ser un número.' })
  id_sat_unidad_aduana: number;

  @ApiProperty({
    example: '|||||||0|0|0|01|01',
    description: 'codigo_barras: codigo de barra para hacer la funcionalidad del scaner.',
  })
  @IsString(      { message: 'codigo_barras: debe ser String' })
  codigo_barras: string;

  @ApiProperty({
    example: 1,
    description: 'id_eccs_estatus: asigna el valor dentro del catalogo del SAT para ver el serivicio o codigo al que pertenece.',
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
  activo: boolean;

  
}
