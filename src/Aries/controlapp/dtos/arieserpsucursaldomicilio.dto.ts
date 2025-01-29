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

export class DomicilioSucursalDTO {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador de la sucursal dentro de AriesERP',
    uniqueItems: true,
  })
  id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador de la sucursal dentro de AriesERP',
  })
  @Min(5, { message: "CP debe tener minimo 5 digitos" })
  cp: number;

  @ApiProperty({
    example: 'Tuitlan',
    description: 'Nombre de la calle.',
  })
  @IsString({ message: 'Calle: debe ser String' })
  @MinLength(3, { message: 'Calle debe tener al menos 3 caracteres.' })
  @MaxLength(20, { message: 'Calle no debe exceder a 20 caracteres.' })
  calle: string;

  @ApiProperty({
    example: 122,
    description:
      'num_ext: Numero exterior de la sucursal',
  })
  @Min(1, { message: "num_ext debe tener minimo 1 digito" })
  num_ext: number;

  @ApiProperty({
    example: 122,
    description:
      'num_int: Numero exterior de la sucursal',
  })
  @Min(1, { message: "num_ext debe tener minimo 1 digito" })
  num_int: number;

  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la sucursal',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(10,      { message: 'id_estatus: no debe tener más de 10.' })
  id_sucursal: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador del país',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus: no debe tener más de 99.' })
  id_pais: number;


}
