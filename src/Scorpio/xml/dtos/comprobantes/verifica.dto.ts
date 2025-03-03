import { IsString, MaxLength, MinLength } from 'class-validator';
export class VerificaDto {

  @IsString() 
  @IsString({     message: 'userPade debe ser un String' })
  @MinLength(3,  { message: 'userPade debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'userPade no debe exceder 50 caracteres' })
  readonly userPade:    string;

  @IsString() 
  @IsString({     message: 'passPade debe ser un String' })
  @MinLength(3,  { message: 'passPade debe tener al menos 3 caracteres' })
  @MaxLength(15, { message: 'passPade no debe exceder 15 caracteres' })
  readonly passPade:    string;

  @IsString() 
  @IsString({      message: 'contrato debe ser un String' })
  @MinLength(3,  { message: 'contrato debe tener al menos 3 caracteres' })
  @MaxLength(30, { message: 'contrato no debe exceder 30 caracteres' })
  readonly contrato:    string;

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