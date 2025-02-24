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

export class DepartamentoDTO {


  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador Unico del cliente dentro de AriesERP',
       uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Capital humano',
    description: 'nombre referente al departamento.',
  })
  @IsString({ message:   'descripcion: debe ser String' })
  @MinLength(5, { message:  'descripcion debe tener al menos 5 caracteres.' })
  @MaxLength(50, { message: 'descripcion no debe exceder a 50 digitos.' })
  descripcion: string;


  @ApiProperty({
    example: 'Usuario RH',
    description: 'descripcion referente a la descripción.',
  })
  @IsString({ message:   'observaciones: debe ser String' })
  @MinLength(5, { message:  'observaciones debe tener al menos 5 caracteres.' })
  @MaxLength(50, { message: 'observaciones no debe exceder a 50 digitos.' })
  observaciones: string;


  @ApiProperty({
    example: '1.0',
    description: 'nivel de orden.',
  })
  @IsString({ message:   'orden: debe ser String' })
  @MinLength(2, { message:  'orden debe tener al menos 2 caracteres.' })
  @MaxLength(5, { message: 'orden no debe exceder a 5 digitos.' })
  orden: string;


  @ApiProperty({
    example: true,
    description: 'Valida la visibilidad de toda la aplicacion.',
  })
  @IsBoolean()
  activo: boolean;


  @ApiProperty({
    example: 1,
    description: 'ID: identificador del estado actual del departamento',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un número.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus: no debe tener más de 99.' })
  id_estatus: number;




}
