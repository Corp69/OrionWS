import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ConfiguracionesService } from '../services/configuraciones.service';

@ApiTags('OrionWS - AriesERP - Modulo Configuraciones.')
@Controller('arieserp/configuraciones')
@Auth()
export class ConfiguracionesController {

  constructor(private readonly Service: ConfiguracionesService ) {}
  
    @Post('activas/:id')
    @Post()
    @ApiParam({
      name: 'id',
      description: 'Filtro: ID AriesERP - Modulo Configuraciones. 0 = TODAS ',
      required: true,
      type: Number, // Especificamos que el tipo es un número
    })
    @ApiOperation({ summary: 'AriesERP - Modulo Configuraciones - Activas.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Configuraciones - Activas.',
      content: {
        'application/json': {
          example: {
             "Success": true,
             "Titulo": "AriesERP - Modulo Configuraciones - Configuraciones Activas.",
             "Mensaje": "Operacion Realizada con exito.",
             "Response": {
              "data": [
                {
                    "id": 1,
                    "id_aries_config_modulo": 1,
                    "descripcion": "Aries- Principal",
                    "config": "AriesERP - calculadora",
                    "icon": null,
                    "observaciones": "Habilita la calculadora integrada de arieserp ",
                    "activo": true
                }
              ]
             }
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    getConf( @GetUser('id') idUser: number, @Param('id') id: number ) {
       return this.Service.Configuraciones( idUser, id );
    }  




}
