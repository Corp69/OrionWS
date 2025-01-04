import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ControlAppService } from '../services/controlapp.service';

@ApiTags('OrionWS - AriesERP - Modulo Configuraciones.')
@Controller('arieserp/configuraciones')
@Auth()
export class ControlAppController {

  constructor(private readonly Service: ControlAppService ) {}
  
    @Post('activas/:id')
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


    @Post('menu/:id')
    @ApiParam({
      name: 'id',
      description: 'Filtro: ID Usuario - AriesERP - Modulo Configuraciones. ID = USUARIO.',
      required: true,
      type: Number, // Especificamos que el tipo es un número
    })
    @ApiOperation({ summary: 'OrionWS: AriesERP - Modulo Configuraciones - Menu.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Configuraciones - Menu.',
      content: {
        'application/json': {
          example:{
              "Success": true,
              "Titulo": "OrionWS: AriesERP - Modulo Configuraciones - Menu.",
              "Mensaje": "Operacion Realizada con exito.",
              "Response": 
              {
                  "menu": 
                  [
                      {
                          "modulo": "Configuraciones",
                          "items": [
                              {
                                  "id": 1,
                                  "id_aries_config_modulo": 1,
                                  "label": "Conf. Activas",
                                  "url": "",
                                  "icon": null,
                                  "activa": true
                              }
                          ]
                      },
                      {
                          "modulo": "CO - Contabilidad",
                          "items": [
                              {
                                  "id": 2,
                                  "id_aries_config_modulo": 2,
                                  "label": "Cuentas",
                                  "url": null,
                                  "icon": null,
                                  "activa": true
                              }
                          ]
                      }
                  ]
              }
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    getMenu ( @GetUser('id') idUser: number, @Param('id') id: number ) {
       return this.Service.Menu( idUser, id );
    }  




}
