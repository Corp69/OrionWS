import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Matches, Max, MAX, MaxLength, Min, MinLength } from 'class-validator';

export class excelDto {

  @ApiProperty({
    example: '2025-01-01',
    description: '_fechainicio: para realizar el inicio del rango a consultar',
  })
  @IsString({ message: '_fechainicio debe ser un string' })
  @MinLength(10, { message: '_fechainicio debe tener exactamente 10 caracteres' })
  @MaxLength(10, { message: '_fechainicio debe tener exactamente 10 caracteres' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: '_fechainicio debe tener el formato YYYY-MM-DD',
  })
  readonly _fechainicio: string;

  @ApiProperty({
    example: '2025-01-01',
    description: '_fechatermina: para realizar el inicio del rango a consultar',
  })
  @IsString({ message: '_fechatermina debe ser un string' })
  @MinLength(10, { message: '_fechatermina debe tener exactamente 10 caracteres' })
  @MaxLength(10, { message: '_fechatermina debe tener exactamente 10 caracteres' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: '_fechatermina debe tener el formato YYYY-MM-DD',
  })
  readonly _fechatermina: string;

  @ApiProperty({
    example: 3,
    description: '_id_tipo: debe ser un número entre 1 y 5',
  })
  @IsNumber({}, { message: 'id_tipo debe ser un número' })
  @Min(1, { message: 'id_tipo debe ser mayor o igual a 1' })
  @Max(5, { message: 'id_tipo no debe ser mayor a 5' })
  readonly _id_tipo: number;

  @ApiProperty({
    example: 41,
    description: '_id_empresa: debe ser un número.',
  })
  @IsNumber({}, { message: 'id_tipo debe ser un número' })
  @Min(1, { message: '_id_empresa debe ser mayor a 1 este debe estar registrado en BD' })
  @Max(999, { message: '_id_empresa no debe excer a 1000' })
  readonly _id_empresa: number;

}
