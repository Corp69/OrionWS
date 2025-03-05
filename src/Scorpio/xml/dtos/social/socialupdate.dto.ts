import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';


// DTO para fiel
export class razonSocialDTO {
  @ApiProperty({
    example: 'PFXSDMSKMDKMFDMÑLFSMFGOIJOJGREGOERMGPODMSFDÑLMGÑLFMG',
    description: 'Archivo PFX',
  })
  @IsString({ message: 'pfx debe ser un String' })
  pfx: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del archivo PFX',
  })
  @IsString({ message: 'passPfx debe ser un String' })
  @MinLength(3, { message: 'passPfx debe tener al menos 3 caracteres' })
  passPfx: string;

  @IsString({ message: 'certificado debe ser un String' })
  @MinLength(3, { message: 'certificado debe tener al menos 3 caracteres' })
  certificado: string;

  // Constructor para inicializar valores por defecto
  constructor(pfx: string = "", passPfx: string = "", certificado: string = "") {
    this.pfx = pfx;
    this.passPfx = passPfx;
    this.certificado = certificado;
  }
}

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

  @ApiProperty({
    type: razonSocialDTO,
    description: 'Información sobre el RFC y la contraseña CIEC',
  })
  razon_social: razonSocialDTO;

  // Constructor para inicializar valores por defecto y objetos complejos
  constructor(
      userPade: string = "", 
      passPade: string = "", 
      contrato: string = "", 
      rfc:      string = "",
      razon_social: razonSocialDTO = new razonSocialDTO()
    ) {
    this.userPade = userPade;
    this.passPade = passPade;
    this.contrato = contrato;
    this.rfc      = rfc;
    this.razon_social = razon_social;
  }
  
}