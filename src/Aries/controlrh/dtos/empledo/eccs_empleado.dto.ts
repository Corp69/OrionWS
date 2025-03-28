import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class EmpleadoDTO {


  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador Unico del empleado',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Rodrigo',
    description: 'nombre del empleado.',
    uniqueItems: true,
  })
  @IsString({ message: 'nombre: debe ser String' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no debe exceder a 50 digitos.' })
  nombre: string;


  @ApiProperty({
    example: 'Torres',
    description: 'Primer apellido del proveedor.',
  })
  @IsString({ message: 'apellidop: debe ser String' })
  @MinLength(3, { message: 'El apellidop debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El apellidop no debe exceder a 20 digitos.' })
  apellidop: string;


  @ApiProperty({
    example: 'Magón',
    description: 'Segundo apellido del proveedor.',
  })
  @IsString({ message: 'apellidom: debe ser String' })
  @MinLength(3, { message: 'El apellidom debe tener al menos 5 caracteres.' })
  @MaxLength(50, { message: 'El apellidom no debe exceder a 20 digitos.' })
  apellidom: string;

  @ApiProperty({
    example: 'Magón',
    description: 'Segundo apellido del proveedor.',
  })
  @IsString({ message: 'correo_personal: debe ser String' })
  @MaxLength(50, { message: 'correo_personal:  no debe exceder a 50 digitos.' })
  correo_personal: string;

  @ApiProperty({
    example: 84780312345,
    description: 'nss: número de referencia',
  })
  @IsNumber({}, { message: 'nss: Debe ser number' })
  @IsOptional()
  @Min(1000000000, { message: 'nss debe tener al menos 10 dígitos.' })
  @Max(99999999999, { message: 'nss teléfono no debe tener más de 11 dígitos.' })
  nss: number;


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
  @IsString({      message: 'curp: debe ser String' })
  @MaxLength(18, { message: 'curp: No debe exceder al 18 caracteres.' })
  curp: string;

  @ApiProperty({
    example: '12/12/2002',
    description: 'Fecha de nacimiento: día de nacimiento',
  })
  @IsString({ message:      'fecha_nacimiento: debe ser String' })
  @IsOptional()
  @MaxLength(15, { message: 'fecha_nacimiento: No debe exceder a 10 caracteres.' })
  fecha_nacimiento: string;

  @ApiProperty({
    example: 'luis@gmail.com',
    description: 'correo_usuario: Correo del empleado',
  })
  @IsString({      message: 'correo_usuario: debe ser String' })
  @IsOptional()
  @MaxLength(50, { message: 'correo_usuario: No debe exceder a 50 caracteres.' })
  correo_usuario: string;

  @ApiProperty({
    example: 'eccs@eccs.com.mx',
    description: 'correo_clave:  clave del empleado',
  })
  @IsString({      message: 'correo_clave: debe ser String' })
  @IsOptional()
  @MaxLength(50, { message: 'correo_clave: No debe exceder a 50 caracteres.' })
  correo_clave: string;


  @ApiProperty({
    example: 123456789012345678,
    description: 'cuenta_banco:ingrese datos de cuenta bancaria',
  })
  @IsNumber({}, { message: 'cuenta_banco: Debe ser numero' })
  @Min(10000000000, { message: 'cuenta_banco debe tener al menos 11 dígitos.' })
  @Max(999999999999, { message: 'cuenta_banco no debe tener más de 12 dígitos.' })
  cuenta_banco: number;

  @ApiProperty({
    example: 123456789012345678,
    description: 'clabe: clabe de cuenta bancaria',
  })
  @IsNumber({}, { message: 'clabe: Debe ser numero' })
  @Min(10000000000000000, { message: 'clabe debe tener al menos 18 dígitos.' })
  @Max(9999999999999999999, { message: 'clabe teléfono no debe tener más de 18 dígitos.' })
  clabe: number;


  @ApiProperty({
    example: 4651068560,
    description: 'Whatsapp: Número del empleado. Debe tener exactamente 10 dígitos.',
  })
  @IsNumber({}, { message: 'El whatsapp debe ser un número.' })
  @Min(1000000000, { message: 'El whatsapp debe tener al menos 10 dígitos.' })
  @Max(9999999999, { message: 'El whatsapp no debe tener más de 10 dígitos.' })
  whatsapp: number;

  @ApiProperty({
    example: 'Se traba al hablar',
    description: 'observaciones: Se describen las observaciones vistas',
  })
  @IsString( { message: 'observaciones: Debe ser string' })
  @IsOptional()
  @MaxLength(60,      { message: 'observaciones: No debe exceder a 60 caracteres.' })
  observaciones: string;

  @ApiProperty({
    example: '9 meses',
    description: 'antiguedad: detalla la antiguedad del empleado',
  })
  @IsString( { message: 'antiguedad: Debe ser string' })
  @IsOptional()
  @MaxLength(10,      { message: 'antiguedad: No debe exceder a 10 caracteres.' })
  antiguedad: string;

  // @ApiProperty({
  //   example: 'Jornada completa',
  //   description: 'Tipo contrato: detalla el contrato del empleado',
  // })
  // @IsString( { message: 'Tipo contrato: Debe ser string' })
  // @MaxLength(30,      { message: 'Tipo contrato: No debe exceder a 30 caracteres.' })
  // tipocontrato: string;

  @ApiProperty({
    example: 4651255878,
    description: 'Telefono: Numero de telefono',
  })
  @IsNumber({},    { message: 'El teléfono debe ser un número.' })
  @IsOptional()
  @Min(1000000000, { message: 'El teléfono debe tener al menos 10 dígitos.' })
  @Max(9999999999, { message: 'El teléfono no debe tener más de 10 dígitos.' })
  telefono: number;

  @ApiProperty({
    example: 3,
    description: 'Nivel Acceso: Explica el nivel de acceso del emplado',
  })
  @IsNumber({},{ message: 'Nivel Acceso: Debe ser number' })
  @IsOptional()
  @Max(4, { message: 'Nivel Acceso: No debe exceder a 1 caracter.' })
  nivelacceso: number;

  // @ApiProperty({
  //   example: 'luis21@gmail.com',
  //   description: 'E-Mail: Correo personal del empleado',
  // })
  // @IsString( { message: 'E-Mail: Debe ser string' })
  // @IsOptional()
  // @MaxLength(40,      { message: 'E-Mail: No debe exceder a 40 caracteres.' })
  // email: string;

  // @ApiProperty({
  //   example: 'luis65$R',
  //   description: 'Contraseña: Correo personal del empleado',
  // })
  // @IsString( { message: 'Contraseña: Debe ser string' })
  // @IsOptional()
  // @MinLength(8,       { message: 'Contraseña: debe tener almenos 8 caracteres' })
  // @MaxLength(12,      { message: 'Contraseña: No debe exceder a 12 caracteres.' })
  // password: string;

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
    description: 'Sexo: identificador del sexo del empleado',
  })
  @IsNumber({}, { message: 'El id_sexo debe ser un número.' })
  @Min(1,       { message: 'id_sexo: debe tener al menos 1.' })
  @Max(99,      { message: 'id_sexo: no debe tener más de 99.' })
  id_sexo: number;

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
    description: 'ID: identificador de id_sat_usocfdi dentro de uso de CFDI',
  })
  @IsNumber({}, { message: 'El id_sat_usocfdi debe ser un número.' })
  @Min(1,       { message: 'debe tener al menos 1.' })
  @Max(99,      { message: 'no debe tener más de 99.' })
  id_sat_usocfdi: number;

  
  @ApiProperty({
    example: 1,
    description: 'ID_estado_civil: identificador del estado civil del emplado ',
  })
  @IsNumber({}, { message: 'El id_estado_civil debe ser un número.' })
  @Min(1,       { message: 'id_estado_civil: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estado_civil: no debe tener más de 99.' })
  id_estado_civil: number;









}
