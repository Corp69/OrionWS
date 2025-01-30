import { ApiProperty } from '@nestjs/swagger';
import { IsString    } from 'class-validator';

export class CertificadoDTO {
  
  @ApiProperty({
    example: 'XAOXAX3034',
    description: 'certificado: encryptado base64 certificado .key .pfx .ciec .cer',
    uniqueItems: true,
  })
  @IsString({ message: 'certificado: debe ser String' })
  certificado: string;

}
