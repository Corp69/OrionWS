import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
export class MultiVerificaDto {

  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo del usuario',
  })
  @IsString({ message: 'userPade debe ser un String' })
  @MinLength(5, { message: 'userPade debe tener al menos 5 caracteres' })
  userPade: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsString({ message: 'passPade debe ser un String' })
  @MinLength(6, { message: 'passPade debe tener al menos 6 caracteres' })
  passPade: string;

  @ApiProperty({
    example: 'contract_12345',
    description: 'Identificador del contrato',
  })
  @IsString({ message: 'contrato debe ser un String' })
  @MinLength(5, { message: 'contrato debe tener al menos 5 caracteres' })
  @MaxLength(255, { message: 'contrato no debe exceder 255 caracteres' })
  contrato: string;

  @IsString() 
  @IsString({      message: 'solicitud debe ser un String' })
  @MinLength(4, { message: 'solicitud debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'solicitud debe tener maximo 100 caracteres' })
  readonly solicitud: string;

  // Constructor para inicializar valores por defecto y objetos complejos
  constructor(userPade: string = "", passPade: string = "", contrato: string = "", solicitud: string = "") {
    this.userPade = userPade;
    this.passPade = passPade;
    this.contrato = contrato;
    this.solicitud = solicitud;
  }
}