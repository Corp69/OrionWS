import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, Matches, Max, MAX, Min } from 'class-validator';

export class excelDto {

  @ApiProperty({
    example: '01-01-2025',
    description: '_fechainicio: para realizar el inicio del rango a consultar',
  })
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: '_fechainicio: debe tener el formato YYYY-MM-DD',
  })
  @IsDate({ message: '_fechainicio: debe ser una fecha válida' })
  readonly _fechainicio: Date;

  @ApiProperty({
    example: '01-12-2025',
    description: '_fechatermina: para realizar el fin del rango a consultar',
  })
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: '_fechatermina debe tener el formato YYYY-MM-DD',
  })
  @IsDate({ message: '_fechatermina: debe ser una fecha válida' })
  readonly _fechatermina: Date;

  @ApiProperty({
    example: 3,
    description: '_id_tipo: debe ser un número entre 1 y 5',
  })
  @IsNumber({}, { message: 'id_tipo debe ser un número' })
  @Min(1, { message: 'id_tipo debe ser mayor o igual a 1' })
  @Max(5, { message: 'id_tipo no debe ser mayor a 5' })
  readonly _id_tipo: number;

}
