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

export class ClienteDTO {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador Unico del cliente dentro de AriesERP',
    uniqueItems: true,
  })
  id?: number;

  @ApiProperty({
    example: 'ECCS',
    description: 'nombre de la persona fisica o moral.',
    uniqueItems: true,
  })
  @IsString({ message: 'nombre: debe ser String' })
  @MinLength(3, { message: 'El nombre debe tener al menos 5 caracteres.' })
  @MaxLength(50, { message: 'El nombre no debe exceder a 50 digitos.' })
  nombre: string;

  @ApiProperty({
    example: 'OXOXOXOXOXOXOO',
    description: 'RFC de la persona fisica o moral.',
    uniqueItems: true,
  })
  @IsString({ message: 'rfc: debe ser String' })
  @MinLength(12, { message: 'El RFC debe tener al menos 12 caracteres.' })
  @MaxLength(14, { message: 'El RFC no debe exceder a 14 digitos.' })
  rfc: string;

  @ApiProperty({
    example: 'XAOXAX',
    description:
      'curp del cliente informacion adicional ',
  })
  @IsString({      message: 'curp: debe ser String' })
  @MaxLength(18, { message: 'curp: No debe exceder al 18 caracteres.' })
  curp: string;

  @ApiProperty({
    example: 'ECCS34',
    description: 'codigo: codigo de referencia',
    uniqueItems: true,
  })
  @IsString({ message:      'codigo: debe ser String' })
  @MaxLength(15, { message: 'codigo: debe exceder a 15 caracteres.' })
  codigo: string;

  @ApiProperty({
    example: 'eccs@eccs.com.mx',
    description: 'correo: Correo del cliente',
  })
  @IsString({      message: 'correo: debe ser String' })
  @MaxLength(50, { message: 'correo: debe exceder a 50 caracteres.' })
  correo: string;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activo: boolean;

  
  @ApiProperty({
    example: 1,
    description: 'ID: identificador Unico de la moneda 1 = MXN ',
  })
  @IsNumber({}, { message: 'El id_moneda debe ser un número.' })
  @Min(1,       { message: 'id_moneda: debe tener al menos 1.' })
  @Max(99,      { message: 'id_moneda: no debe tener más de 99.' })
  id_moneda: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de id_sat_usocfdi dentro de uso de CFDI',
  })
  @IsNumber({}, { message: 'El id_sat_usocfdi debe ser un número.' })
  @Min(1,       { message: 'debe tener al menos 1.' })
  @Max(99,      { message: 'no debe tener más de 99.' })
  id_sat_usocfdi: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador del catalogo sat_regimenfiscal dentro del CFDI',
  })
  @IsNumber({}, { message: 'El id_sat_regimenfiscalcfdi debe ser un número.' })
  @Min(1,       { message: 'id_sat_regimenfiscalcfdi debe tener al menos 1.' })
  @Max(99,      { message: 'id_sat_regimenfiscalcfdi no debe tener más de 99.' })
  id_sat_regimenfiscalcfdi: number;


  @ApiProperty({
    example: 1,
    description: 'ID: identificador del estado actual del cliente',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus: no debe tener más de 99.' })
  id_estatus: number;


  @ApiProperty({
    example: 1,
    description: 'ID: identificador del cliente identifica cuando es NACIONAL, EXTRANGERO, GLOBAL',
  })
  @IsNumber({}, { message: 'El id_tipo_cliente debe ser un número.' })
  @Min(1,       { message: 'id_tipo_cliente: debe tener al menos 1.' })
  @Max(99,      { message: 'id_tipo_cliente: no debe tener más de 99.' })
  id_tipo_cliente: number;


}
