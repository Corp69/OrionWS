import { IsString, MaxLength, MinLength } from 'class-validator';
export class MultiSolicitaDto {

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
  readonly contratoTimbrado: string;
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly uuid: string;
}