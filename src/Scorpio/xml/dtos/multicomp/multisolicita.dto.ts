import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNumber, Max, Min, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class MultiSolicitaDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'ID: identificador del comprobante',
    uniqueItems: true,
  })
  id: number;
  
  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo del usuario',
  })
  @IsString({ message: 'userPade debe ser un String' }) 
  @MinLength(5, { message: 'userPade debe tener al menos 5 caracteres' })
 userPade:    string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsString({ message: 'userPade debe ser un String' }) 
  @MinLength(6, { message: 'passPade debe tener al menos 6 caracteres' })
 passPade:    string;

  @ApiProperty({
    example: 'contract_12345',
    description: 'Identificador del contrato',
  })
  @IsString({ message: 'contrato debe ser un String' })
  @MinLength(5, { message: 'contrato debe tener al menos 5 caracteres' })
  @MaxLength(255, { message: 'contrato no debe exceder 255 caracteres' })
 contrato:    string;

 @ApiProperty({
  example: '2021-01-01',
  description: 'Fecha inicial del rango de búsqueda',
  })
  @IsString({ message: 'fechaInicio debe ser un String' })
  @MinLength(10, { message: 'fechaInicio debe tener el formato yyyy-mm-dd' })
  @MaxLength(10, { message: 'fechaInicio debe tener el formato yyyy-mm-dd' })
  fechaInicio: string;

  @ApiProperty({
    example: '2021-01-01',
    description: 'Fecha fin del rango de búsqueda',
  })
  @IsString({ message: 'fechaFin debe ser un String' })
  @MinLength(10, { message: 'fechaFin debe tener el formato yyyy-mm-dd' })
  @MaxLength(10, { message: 'fechaFin debe tener el formato yyyy-mm-dd' })
  fechaFin: string;

  @ApiProperty({
    example: 'XAOXAX',
    description: 'RFC de la persona física o moral',
  })
  @IsArray({ message: 'rfc debe ser un arreglo de cadenas' })
  @IsString({ each: true, message: 'Cada elemento de rfc debe ser un String' })
  rfc: string[];

  @ApiProperty({
    example: 'emisor',
    description: 'tipo de petición',
  })
  @IsString({ message: 'peticion debe ser un String' })
  @MinLength(6, { message: 'peticion debe tener al menos 6 caracteres' })
  peticion: string;

  @ApiProperty({
    example: 1,
    description: 'Tipo de comprobante',
  })
  @IsOptional()
  @IsString( { message: 'El tipo debe ser un string.' })
  @MinLength(1, { message: 'tipo: debe tener al menos 1 caracter.' })
  @MaxLength(1, { message: 'tipo: no debe tener más de un caracter.' })
  tipo?: string;

  @ApiProperty({
    example: '10',
    description: 'Rango mínimo de total de búsqueda',
  })
  @IsNumber()
  @MinLength(10, { message: 'montoMinimo debe tener al menos 1 caracter' })
  montoMin: number;

  @ApiProperty({
    example: '10',
    description: 'Rango mínimo de total de búsqueda',
  })
  @IsNumber()
  @MinLength(1, { message: 'montoMaximo debe tener al menos 1 caracter' })
  montoMax: number;

  


  // Constructor para inicializar valores por defecto y objetos complejos
     constructor(
      userPade: string = "",
      passPade: string = "",
      contrato: string = "",
      fechaInicio: string = "",
      fechaFin: string = "",
      rfc: string[] = [],
      peticion: string = "",
      tipo: string,
      montoMin: number,
      montoMax: number
      
    ) {
      this.userPade = userPade;
      this.passPade = passPade;
      this.contrato = contrato;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.rfc = rfc;
      this.peticion = peticion;
      this.tipo = tipo;
      this.montoMin = montoMin;
      this.montoMax = montoMax;
      

    }

}