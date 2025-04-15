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

export class eccs_reportes_vistaDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'ID: identificador del control de datos servicio de AriesERP',
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Catalogo empresas',
    description: 'Descripción del campo.',
  })
  @IsString({ message: 'Descripción: debe ser String' })
  @MinLength(3,   { message: 'El Descripción: debe tener almenos 3  caracteres.' })
  @MaxLength(100, { message: 'El Descripción: no debe exceder a 100 caracteres.' })
  descripcion: string;

  @ApiProperty({
    example: 'descripcion del valor de los datos',
    description: 'Valor: info sobre los datos.',
  })
  @IsString({ message: 'Valor: debe ser String' })
  @MinLength(5,   { message: 'Valor: debe tener almenos 5  caracteres.' })
  @MaxLength(1000, { message: 'Valor: no debe exceder a 1000 caracteres.' })
  valor: string;

  @ApiProperty({
    example: 1,
    description: 'ID de aplicación ECCS.',
  })
  @IsNumber({}, { message: 'El id_eccs_aplicacion debe ser un número.' })
  @Min(1, { message: 'El id_eccs_aplicacion debe ser al menos 1.' })
  @Max(10,      { message: 'id_eccs_aplicacion: no debe tener más de 10.' })
  id_eccs_aplicacion: number;

  @ApiProperty({
    example: 1,
    description: 'ID de módulo ECCS.',
  })
  @IsNumber({}, { message: 'El id_eccs_modulo debe ser un número.' })
  @Min(1, { message: 'El id_eccs_modulo debe ser al menos 1.' })
  @Max(10,      { message: 'id_eccs_modulo: no debe tener más de 10.' })
  id_eccs_modulo: number;

  @ApiProperty({
    example: 1,
    description: 'ID de estatus ECCS.',
  })
  @IsNumber({}, { message: 'El id_eccs_estatus debe ser un número.' })
  @Min(1, { message: 'El id_eccs_estatus debe ser al menos 1.' })
  @Max(100, { message: 'El id_eccs_estatus no debe ser mayor a 100.' })
  id_eccs_estatus: number;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad en toda la aplicación.',
  })
  @IsBoolean()
  activo: boolean;
}
