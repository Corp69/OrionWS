import { IsString, MaxLength, MinLength } from 'class-validator';
export class ComprobanteDto {

  @IsString({ message: "userPade debe ser un string"}) 
  @MinLength(5, {message: "userPade debe tener al menos 5 caracteres"})
  @MaxLength(100)
  readonly userPade:    string;

  @IsString({ message: "passPade debe ser un string"}) 
  @MinLength(6, {message: "passPade debe tener al menos 6 caracteres"})
  @MaxLength(100)
  readonly passPade:    string;

  @IsString({ message: "contrato debe ser un string"}) 
  @MinLength(5, { message: 'contrato debe tener al menos 5 caracteres' })
  @MaxLength(255, { message: 'contrato no debe exceder 255 caracteres' })
  readonly contrato:    string;

  @IsString({ message: "contratoTimbrado debe ser un string"}) 
  @MinLength(4, { message: 'contratoTimbrado debe tener al menos 4 caracteres' })
  @MaxLength(100, { message: 'contratoTimbrado no debe exceder 100 caracteres' })
  readonly contratoTimbrado: string;

  @IsString({ message: "uuid debe ser un string"}) 
  @MinLength(4, { message: 'uuid debe tener al menos 4 caracteres' })
  @MaxLength(100, { message: 'uuid no debe exceder 100 caracteres' })
  readonly uuid: string;
}