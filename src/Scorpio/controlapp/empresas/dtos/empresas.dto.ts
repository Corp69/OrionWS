import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class EmpresasDTO {
  
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la empresa dentro de ECCS. Puede Ser Opcional',
    uniqueItems: true,
  })
  id?: number;

  @ApiProperty({
    example: 'XAOXAX',
    description:
      'RFC de la persona fisica o moral.',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(12)
  @MaxLength(13)
  rfc: string;

  @ApiProperty({
    example: 'XAOXAX',
    description:
      'observaciones observaciones de la empresa informacion adicional '
  })
  @IsString()
  @MaxLength(50)
  observaciones: string;


  @ApiProperty({
    example: 'XAOXAX',
    description:
      'nombrecomercial: Nombre, definicion de la empresa',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  nombrecomercial: string;

  @ApiProperty({
    example: 'XAOXAX',
    description:
      'aviso privacidad por empresa'  
    })
  @IsString()
  aviso_privacidad: string;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la empresa dentro de uso de CFDI'
  })
  @IsNumber()
  id_sat_usocfdi: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de la empresa dentro del Regimen'
  })
  @IsNumber()
  id_sat_regimenfiscal: number;

  @ApiProperty({
    example: 1,
    description: 'ID: identificador de estatus de la empresa.'
  })
  @IsNumber()
  id_estatus: number;
}
