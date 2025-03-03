import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
export class PeticionDto {

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

  @ApiProperty({
    example: 'XAOXAX',
    description: 'RFC de la persona física o moral',
  })
  @IsString({ message: 'rfc debe ser un String' })
  @MinLength(12, { message: 'rfc debe tener al menos 12 caracteres' })
  @MaxLength(14, { message: 'rfc no debe exceder 14 caracteres' })
  rfc: string;

  @IsNumber() 
  @Min(1,)
  @Max(1000, {message:"limit debe tener maximo 1000"})
  limit: number;

  // Constructor para inicializar valores por defecto y objetos complejos
  constructor(userPade: string = "", passPade: string = "", contrato: string = "", rfc: string = "", limit: number) {
    this.userPade = userPade;
    this.passPade = passPade;
    this.contrato = contrato;
    this.rfc = rfc;
    this.limit = limit;
  }

}