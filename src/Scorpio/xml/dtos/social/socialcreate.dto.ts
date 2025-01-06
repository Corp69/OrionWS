import { IsString, MaxLength, MinLength } from 'class-validator';
export class SocialCreateDto {

  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly userPade:    string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly passPade:    string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly contrato:    string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly razonSocial: string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly fechaInicioSync: string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly maxComprobantesMensual: string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly celular: string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly fiel: string;
  
  
  
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly ciec: string;




  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly sync: string;
  

}