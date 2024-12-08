import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EccsService } from './Eccs.service';
import { EccsDTO } from './dto/Eccs.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';

@ApiTags('ECCS - OrionWS - Modulo Actualizaciones.')
@Controller('eccs/base')
@Auth()
export class EccsController {

  constructor(private readonly Service: EccsService ) {}
  
  @ApiOperation({ summary: 'ECCS - Muestra Actualizaciones Pendientes.' })
  @ApiResponse({
    status: 200,
    description: 'ECCS: AriesERP - Actualizaciones.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: "ECCS: AriesERP - Actualizaciones.",
          Mensaje: "Operacion Realizada con exito.",
          Response: {
            "actualizaciones": [
              {
                  "id": 1,
                  "modulo": "LOGIN",
                  "actualizacion": "Actualizacion Login",
                  "fechadisponible": "2024-12-08",
                  "actividad": "Se agrega Validacion de pago.",
                  "query": "data cargada... "
              }
          ]
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'ECCS: AriesERP - Actualizaciones.',
    content: {
      'application/json': {
        example: {

           "message": "Unauthorized",
           "statusCode": 401

        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Post('update')
  getContacto( @Body() EccsDTO: EccsDTO ) {
    return this.Service.getActualizaciones( EccsDTO );
  }   

}
