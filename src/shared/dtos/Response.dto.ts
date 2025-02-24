import { ApiProperty } from '@nestjs/swagger';
import { IsOptional }  from 'class-validator';

export class ResponseDto<T> {
  
  @IsOptional()
  Id?: number;

  @ApiProperty({ 
        example: true, 
        description: 'OrionWS webservice - Operacion Realizada Con Exito.' 
    })
  Success: boolean;
  
  @ApiProperty({ 
        example: 'OrionWS webservice - Modulo', 
        description: 'OironWS: Título del servicio' 
    })
  Titulo: string;
 
  @ApiProperty({ 
        example: 'OrionWS webservice - Transaccion realizada.', 
        description: 'mensaje: mensaje del servicio EndPoint.' 
    })
  Mensaje: string;

  

  @ApiProperty({ 
    description: 'response: La respuesta del servicio EndPoint.' 
    })
  Response: T;

}