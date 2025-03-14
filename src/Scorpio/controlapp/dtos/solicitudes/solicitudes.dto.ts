import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsBoolean, IsOptional } from 'class-validator';

export class SolicitaDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador del comprobante',
    uniqueItems: true,
  })
  id: number;
  
  @ApiProperty({
    example: 'emisor',
    description: 'tipo de petición',
  })
  @IsString({ message: 'tipopeticion debe ser un String' })
  @MinLength(6, { message: 'tipopeticion debe tener al menos 6 caracteres' })
  tipopeticion: string;

  @ApiProperty({
    example: '2021-01-01',
    description: 'Fecha inicial del rango de búsqueda',
  })
  @IsString({ message: 'fechainicio debe ser un String' })
  @MinLength(10, { message: 'fechainicio debe tener el formato yyyy-mm-dd' })
  @MaxLength(10, { message: 'fechainicio debe tener el formato yyyy-mm-dd' })
  fechainicio: string;
  
  @ApiProperty({
    example: '2021-01-01',
    description: 'Fecha fin del rango de búsqueda',
  })
  @IsString({ message: 'fechafin debe ser un String' })
  @MinLength(10, { message: 'fechafin debe tener el formato yyyy-mm-dd' })
  @MaxLength(10, { message: 'fechafin debe tener el formato yyyy-mm-dd' })
  fechafin: string;

  @ApiProperty({
    example: '10',
    description: 'Rango mínimo de total de búsqueda',
  })
  @IsNumber()
  @Min(1, { message: 'montominimo debe tener al menos 1 caracter' })
  @Max(2000, { message: 'montominimo debe tener maximo 2000' })
  montominimo: number;

  @ApiProperty({
    example: '10',
    description: 'Rango mínimo de total de búsqueda',
  })
  @IsNumber()
  @Min(1, { message: 'montomaximo debe tener al menos 1 caracter' })
  @Max(2000, { message: 'montomaximo debe tener maximo 2000' })
  montomaximo: number;

  @ApiProperty({
      example: 1,
      description: 'ID: identificador de estatus de la empresa.',
  })
  @IsNumber({}, { message: 'El id_estatus debe ser un númerico.' })
  @Min(1,       { message: 'id_estatus: debe tener al menos 1.' })
  @Max(99,      { message: 'id_estatus: no debe tener más de 99.' })
  id_estatus: number;

  @ApiProperty({
        example: 1,
        description: 'ID: identificador de estatus de la empresa.',
    })
  @IsNumber({}, { message: 'El id_empresa debe ser un númerico.' })
  @Min(1,       { message: 'id_empresa: debe tener al menos 1.' })
  @Max(99,      { message: 'id_empresa: no debe tener más de 99.' })
  id_empresa: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de estatus de la empresa.',
  })
  @IsOptional()
  @IsNumber({}, { message: 'El id_xml_scorpio_tipo debe ser un númerico.' })
  @Min(1,       { message: 'id_xml_scorpio_tipo: debe tener al menos 1.' })
  @Max(99,      { message: 'id_xml_scorpio_tipo: no debe tener más de 99.' })
  id_xml_scorpio_tipo?: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de estatus de la empresa.',
  })
  @IsOptional()
  @IsString( { message: 'El id_xml_peticion debe ser un númerico.' })
  id_xml_peticion?: string;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de estatus de la empresa.',
  })
  @IsBoolean()
  activo: boolean;

  // Constructor para inicializar valores por defecto y objetos complejos
     constructor(
      
      tipopeticion: string = "",
      fechainicio: string = "",
      fechafin: string = "",
      montominimo: number,
      montomaximo: number,
      id_estatus: number,
      id_empresa: number,
      activo: boolean
    ) {
     
      this.tipopeticion = tipopeticion;
      this.fechainicio = fechainicio;
      this.fechafin = fechafin;
      this.montominimo = montominimo;
      this.montomaximo = montomaximo;
      this.id_estatus = id_estatus;
      this.id_empresa = id_empresa;
      this.activo = activo;
    }

}