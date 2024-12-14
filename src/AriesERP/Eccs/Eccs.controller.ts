import { Controller, Post, Body } from '@nestjs/common';
import { EccsService } from './Eccs.service';
import { EccsDTO } from './dto/Eccs.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EccsCodigoDTO } from './dto/EccsCodigo.dto';

import { Auth, GetUser } from '../../auth/decorators/index';
import { Users } from '../../auth/entities/users.entity';

@ApiTags('ECCS - OrionWS - Modulo Actualizaciones.')
@Controller('eccs/base')
@Auth()
export class EccsController {

  constructor(private readonly Service: EccsService ) {}
  
  @ApiOperation({ summary: 'ECCS - Muestra - Version: la siguiente Act. Pendiente.' })
  @ApiResponse({
    status: 200,
    description: 'ECCS: AriesERP - Version.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: "ECCS: AriesERP - Version.",
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
    description: 'ECCS: AriesERP - Version.',
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
  @Post('version')
  getActualizaciones( @Body() EccsDTO: EccsDTO ) {
    return this.Service.getVersion( EccsDTO );
  }   

  @ApiOperation({ summary: 'ECCS - Muestra Update: Realiza la actualizacion pendiente.' })
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
                    "Success": true,
                    "Titulo": "ECCS: AriesERP - Actualizaciones.",
                    "Mensaje": "Operación Realizada con éxito.",
                    "Response": "Verificar el codigo de seguridad."      
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
  getActualiza( @Body() EccsCodigoDTO: EccsCodigoDTO ) {
    return this.Service.getUpdate( EccsCodigoDTO );
  }   

  @Post('test')
  getTest(
    @GetUser('id') idUser: number) {
    return this.Service.test( idUser );
  }   




}
