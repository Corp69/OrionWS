import { IsString, MaxLength, MinLength } from 'class-validator';
export class SocialUpdateDto {

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
  readonly rfc: string;
 
 
 
 
  @IsString() 
  @MinLength(4)
  @MaxLength(100)
  readonly razon_social: string;
    

}