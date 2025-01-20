import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

// DTO para Ciec
export class CiecDTO {
  @ApiProperty({
    example: 'XAOXAX',
    description: 'RFC de la persona física o moral',
  })
  @IsString({ message: 'rfc debe ser un String' })
  @MinLength(12, { message: 'rfc debe tener al menos 12 caracteres' })
  @MaxLength(14, { message: 'rfc no debe exceder 14 caracteres' })
  rfc: string;

  @ApiProperty({
    example: 'ciec_password',
    description: 'Contraseña CIEC',
  })
  @IsString({ message: 'passCiec debe ser un String' })
  @MinLength(3, { message: 'passCiec debe tener al menos 3 caracteres' })
  passCiec: string;

  // Constructor para inicializar valores por defecto
  constructor(rfc: string = "", passCiec: string = "") {
    this.rfc = rfc;
    this.passCiec = passCiec;
  }
}

// DTO para fiel
export class FielDTO {
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

  // Constructor para inicializar valores por defecto
  constructor(pfx: string = "", passPfx: string = "") {
    this.pfx = pfx;
    this.passPfx = passPfx;
  }
}

export class SocialCreateDto {
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
    example: 'Mi Empresa S.A.',
    description: 'Razón social de la empresa',
  })
  @IsString({ message: 'razonSocial debe ser un String' })
  @MinLength(3, { message: 'razonSocial debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'razonSocial no debe exceder 255 caracteres' })
  razonSocial: string;

  @ApiProperty({
    example: '2021-01-01',
    description: 'Fecha de inicio de la sincronización',
  })
  @IsString({ message: 'fechaInicioSync debe ser un String' })
  @MinLength(10, { message: 'fechaInicioSync debe tener el formato yyyy-mm-dd' })
  @MaxLength(10, { message: 'fechaInicioSync debe tener el formato yyyy-mm-dd' })
  fechaInicioSync: string;

  @ApiProperty({
    example: '1000',
    description: 'Máximo número de comprobantes mensuales',
  })
  @IsString({ message: 'maxComprobantesMensual debe ser un String' })
  maxComprobantesMensual: string;

  @ApiProperty({
    example: '+520123456789',
    description: 'Número de celular',
  })
  @IsString({ message: 'celular debe ser un String' })
  @MinLength(3,  { message: 'celular debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'celular no debe exceder 50 caracteres' })
  celular: string;

   @ApiProperty({
     type: FielDTO,
     description: 'Información sobre el archivo PFX y su contraseña',
   })
   fiel: FielDTO;

  @ApiProperty({
    type: CiecDTO,
    description: 'Información sobre el RFC y la contraseña CIEC',
  })
  ciec: CiecDTO;

  @ApiProperty({
    example: 'ciec/fiel',
    description: 'Tipo de sincronización',
  })
  @IsString({ message: 'sync debe ser un String' })
  sync: string;

   // Constructor para inicializar valores por defecto y objetos complejos
   constructor(
    userPade: string = "",
    passPade: string = "",
    contrato: string = "",
    razonSocial: string = "",
    fechaInicioSync: string = "",
    maxComprobantesMensual: string = "",
    celular: string = "",
    fiel: FielDTO = new FielDTO(),
    ciec: CiecDTO = new CiecDTO(),
    sync: string = "",
  ) {
    this.userPade = userPade;
    this.passPade = passPade;
    this.contrato = contrato;
    this.razonSocial = razonSocial;
    this.fechaInicioSync = fechaInicioSync;
    this.maxComprobantesMensual = maxComprobantesMensual;
    this.celular = celular;
    this.fiel = fiel;
    this.ciec = ciec;
    this.sync = sync;
  }

}