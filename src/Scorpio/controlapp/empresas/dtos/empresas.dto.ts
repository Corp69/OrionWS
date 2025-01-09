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
    description: 'ID: identificador de la empresa dentro de Scorpio',
    uniqueItems: true,
  })
  id?: number;

  @ApiProperty({
    example: 'XAOXAX',
    description: 'RFC de la persona fisica o moral.',
    uniqueItems: true,
  })
  @IsString({ message: 'rfc: debe ser String' })
  @MinLength(12, { message: 'debe tener al menos 12.' })
  @MaxLength(14, { message: 'debe exceder a 14 digitos.' })
  rfc: string;

  @ApiProperty({
    example: 'XAOXAX',
    description:
      'observaciones observaciones de la empresa informacion adicional ',
  })
  @IsString({ message: 'observaciones: debe ser String' })
  @MaxLength(50, { message: 'No debe exceder al 50 caracteres.' })
  observaciones: string;

  @ApiProperty({
    example: 'XAOXAX',
    description: 'nombrecomercial: Nombre, definicion de la empresa',
    uniqueItems: true,
  })
  @IsString({ message: 'nombrecomercial: debe ser String' })
  @MinLength(3, { message: 'debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'debe exceder a 50 caracteres.' })
  nombrecomercial: string;

  @ApiProperty({
    example: 'XAOXAX',
    description: 'aviso privacidad por empresa',
  })
  @IsString({ message: 'aviso_privacidad: debe ser String' })
  @MaxLength(50, { message: 'debe exceder a 50 caracteres.' })
  aviso_privacidad: string;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la empresa dentro de uso de CFDI',
  })
  @IsNumber({}, { message: 'El id_sat_usocfdi debe ser un número.' })
  @Min(1, { message: 'debe tener al menos 1.' })
  @Max(99, { message: 'no debe tener más de 99.' })
  id_sat_usocfdi: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la empresa dentro del Regimen',
  })
  @IsNumber({}, { message: 'El id_sat_regimenfiscal debe ser un número.' })
  @Min(1, { message: 'debe tener al menos 1.' })
  @Max(99, { message: 'no debe tener más de 99.' })
  id_sat_regimenfiscal: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de estatus de la empresa.',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1, { message: 'debe tener al menos 1.' })
  @Max(99, { message: 'no debe tener más de 99.' })
  id_estatus: number;

  @IsString({ message: 'celular: debe ser String' })
  @MinLength(3, { message: 'debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'debe exceder a 50 caracteres.' })
  readonly celular: string;
}
