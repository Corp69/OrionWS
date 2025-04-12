import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Matches, Max, MAX, MaxLength, Min, MinLength } from 'class-validator';

export class excelDto {

  @ApiProperty({
    example: '01-01-2025',
    description: '_fechainicio: para realizar el inicio del rango a consultar',
  })
  @IsString({ message: '_fechainicio debe ser un string' })
  @MinLength(10, { message: '_fechainicio debe tener exactamente 10 caracteres' })
  @MaxLength(10, { message: '_fechainicio debe tener exactamente 10 caracteres' })
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: '_fechainicio debe tener el formato DD-MM-YYYY',
  })
  readonly _fechainicio: string;

  @ApiProperty({
    example: '01-01-2025',
    description: '_fechatermina: para realizar el inicio del rango a consultar',
  })
  @IsString({ message: '_fechatermina debe ser un string' })
  @MinLength(10, { message: '_fechatermina debe tener exactamente 10 caracteres' })
  @MaxLength(10, { message: '_fechatermina debe tener exactamente 10 caracteres' })
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: '_fechatermina debe tener el formato DD-MM-YYYY',
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

}
