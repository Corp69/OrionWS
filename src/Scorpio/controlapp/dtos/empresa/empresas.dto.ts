import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class EmpresasDTO {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador de la empresa dentro de Scorpio',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'XAOXAX3034',
    description: 'RFC de la persona fisica o moral.',
    uniqueItems: true,
  })
  @IsString({ message: 'rfc: debe ser String' })
  @MinLength(12, { message: 'rfc: debe tener al menos 12.' })
  @MaxLength(14, { message: 'rfc: no debe exceder a 14 digitos.' })
  rfc: string;

  @ApiProperty({
    example: '12345',
    description: 'Password de la ciec',
    uniqueItems: true,
  })
  @IsString({ message: 'rfc: debe ser String' })
  @MinLength(3, { message: 'pass: debe tener al menos 3.' })
  @MaxLength(60, { message: 'pass: no debe exceder a 60 digitos.' })
  pass: string;

  @ApiProperty({
    example: 'esta sobre una avenida sobre alteria',
    description:
      'observaciones: un detalle, obejto o caracteristica de la empresa informacion adicional ',
  })
  @IsString({      message: 'observaciones: debe ser String' })
  @MaxLength(50, { message: 'observaciones: No debe exceder al 50 caracteres.' })
  observaciones: string;

  @ApiProperty({
    example: 'Opticas de Aguscalientes',
    description: 'nombrecomercial: Nombre, definicion de la empresa',
    uniqueItems: true,
  })
  @IsString({ message: 'nombrecomercial: debe ser String' })
  @MinLength(3,  { message: 'nombrecomercial: debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'nombrecomercial: no debe exceder a 50 caracteres.' })
  nombrecomercial: string;

  @ApiProperty({
    example: 'the aviso de privacidad dice que  ..... ',
    description: 'aviso privacidad por empresa',
  })
  @IsString({ message: 'aviso_privacidad: debe ser String' })
  @MaxLength(50, { message: 'aviso_privacidad: no debe exceder a 50 caracteres.' })
  aviso_privacidad: string;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la empresa dentro de uso de CFDI',
  })
  @IsNumber({}, { message: 'El id_sat_usocfdi debe ser un númerico.' })
  @Min(1,       { message: 'id_sat_regimenfiscal: debe tener al menos 1.' })
  @Max(99,      { message: 'id_sat_regimenfiscal: no debe tener más de 99.' })
  id_sat_usocfdi: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la empresa dentro del Regimen',
  })
  @IsNumber({}, { message: 'El id_sat_regimenfiscal debe ser un númerico.' })
  @Min(1,       { message: 'id_sat_regimenfiscal: debe tener al menos 1.' })
  @Max(99,      { message: 'id_sat_regimenfiscal: no debe tener más de 99.' })
  id_sat_regimenfiscal: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de estatus de la empresa.',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un númerico.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus: no debe tener más de 99.' })
  id_estatus: number;

  @IsString({ message: 'celular: debe ser String' })
  @MinLength(3,  { message: 'celular: debe tener al menos 3 caracteres.' })
  @MaxLength(13, { message: 'celular: debe exceder a 13 caracteres.' })
  readonly celular:    string;

  @IsNumber({}, { message: 'El No Comprobantes mensual debe ser un númerico.' })
  @Min(1,       { message: 'No Comprobantes mensual debe tener al menos 1.' })
  @Max(999,     { message: 'No Comprobantes mensual no debe tener más de 99.' })
  readonly maxcomprobantesmensual:  number;
}
