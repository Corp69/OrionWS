import { IsString, MaxLength, MinLength } from 'class-validator';
export class SocialUpdateDto {

  @IsString() 
  @IsString({      message: 'userPade debe ser un String' })
  @MinLength(3,  { message: 'userPade debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'userPade no debe exceder 50 caracteres' })
  readonly userPade:    string;

  @IsString() 
  @IsString({      message: 'passPade debe ser un String' })
  @MinLength(3,  { message: 'passPade debe tener al menos 3 caracteres' })
  @MaxLength(15, { message: 'passPade no debe exceder 15 caracteres' })
  readonly passPade:    string;

  @IsString() 
  @IsString({      message: 'contrato debe ser un String' })
  @MinLength(3,  { message: 'contrato debe tener al menos 3 caracteres' })
  @MaxLength(30, { message: 'contrato no debe exceder 30 caracteres' })
  readonly contrato:    string;

  @IsString({      message: 'rfc debe ser un String' })
  @MinLength(12, { message: 'rfc debe tener al menos 12 caracteres' })
  @MaxLength(14, { message: 'rfc no debe exceder 14 caracteres' })
  rfc: string;

  @IsString({      message: 'password debe ser un String' })
  @MinLength(12, { message: 'password debe tener al menos 12 caracteres' })
  @MaxLength(50, { message: 'password no debe exceder 14 caracteres' })
  password: string;
  // Constructor para inicializar valores por defecto y objetos complejos
  constructor(
      userPade: string = "", 
      passPade: string = "", 
      contrato: string = "", 
      rfc:      string = "",
      password: string = ""
    ) {
    this.userPade = userPade;
    this.passPade = passPade;
    this.contrato = contrato;
    this.rfc      = rfc;
    this.password = password;
  }
  
}