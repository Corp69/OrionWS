import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {

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