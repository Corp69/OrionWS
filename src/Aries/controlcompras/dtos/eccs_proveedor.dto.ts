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

export class ProveedorDTO {


  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador Unico del cliente dentro de AriesERP',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Rodrigo',
    description: 'nombre del proveedor.',
    uniqueItems: true,
  })
  // @IsString({ message: 'nombre: debe ser String' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres.' })
  @MaxLength(50, { message: 'El nombre no debe exceder a 50 digitos.' })
  nombre: string;


  @ApiProperty({
    example: 'Torres',
    description: 'Primer apellido del proveedor.',
    uniqueItems: true,
  })
  // @IsString({ message: 'primerapellido: debe ser String' })
  // @MinLength(3, { message: 'El apellido debe tener al menos 5 caracteres.' })
  // @MaxLength(50, { message: 'El apellido no debe exceder a 50 digitos.' })
  primerapellido: string;


  @ApiProperty({
    example: 'Magón',
    description: 'Segundo apellido del proveedor.',
    uniqueItems: true,
  })
  // @IsString({ message: 'segundoapellido: debe ser String' })
  // @MinLength(3, { message: 'El apellido debe tener al menos 5 caracteres.' })
  // @MaxLength(50, { message: 'El apellido no debe exceder a 50 digitos.' })
  segundoapellido: string;



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
      'curp del proveedor informacion adicional ',
  })
  // @IsString({      message: 'curp: debe ser String' })
  // @MaxLength(18, { message: 'curp: No debe exceder al 18 caracteres.' })
  curp: string;

  @ApiProperty({
    example: 'ECCS34',
    description: 'codigo: codigo de referencia',
    uniqueItems: true,
  })
  @IsString({ message:      'codigo: debe ser String' })
  @MaxLength(15, { message: 'codigo: No debe exceder a 15 caracteres.' })
  codigo: string;

  @ApiProperty({
    example: 'eccs@eccs.com.mx',
    description: 'correo: Correo del cliente',
  })
  @IsString({      message: 'correo: debe ser String' })
  @MaxLength(50, { message: 'correo: debe exceder a 50 caracteres.' })
  correo: string;

  @ApiProperty({
    example: '84780312345',
    description: 'nss: número de referencia',
  })
  // @IsString( { message: 'nss: Debe ser string' })
  // @MinLength(8,       { message: 'nss: debe tener almenos 8' })
  // @MaxLength(12,      { message: 'nss: No debe exceder a 12 caracteres.' })
  nss: string;

  @ApiProperty({
    example: 'BBVA',
    description: 'banco: Nombre del banco asociado',
  })
  @IsString({ message:      'banco: debe ser String' })
  @MaxLength(30, { message: 'banco: No debe exceder a 30 caracteres.' })
  banco: string;


  @ApiProperty({
    example: '12345678901',
    description: 'cuenta: número de cuenta bancaria',
  })
  @IsString( { message: 'cuenta: Debe ser numero' })
  // @MinLength(10,       { message: 'cuenta: debe tener almenos 10 caracteres' })
  // @MaxLength(12,      { message: 'cuenta: No debe exceder a 12 caracteres.' })
  cuenta: string;

  @ApiProperty({
    example: '12345678901',
    description: 'clabe: número de clabe bancaria',
  })
  @IsString( { message: 'clabe: Debe ser numero' })
  @MinLength(15,       { message: 'clabe: debe tener almenos 15 caracteres' })
  @MaxLength(18,      { message: 'clabe: No debe exceder a 18 caracteres.' })
  clabe: string;

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
  id_sat_regimenfiscal: number;


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
    description: 'ID: identificador del proveedor identifica cuando es NACIONAL, EXTRANGERO, GLOBAL',
  })
  @IsNumber({}, { message: 'El id_tipo_provedor debe ser un número.' })
  @Min(1,       { message: 'id_tipo_provedor: debe tener al menos 1.' })
  @Max(99,      { message: 'id_tipo_provedor: no debe tener más de 99.' })
  id_tipo_provedor: number;


}
