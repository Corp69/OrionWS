import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ControlappService } from '@shared/Arieserp/services/controlapp/controlapp.service';
import { Auth, GetUser } from 'src/auth/decorators';

@ApiTags('OrionWS - AriesERP - Modulo App. [ rutas compartidas ]')
@Controller('arieserp/shared')
@Auth()
export class LstController {
    
    constructor(private readonly Service: ControlappService) {}
    
    @Post('lst/:tabla')
    @ApiParam({
        name: 'tabla',
        description: 'Filtro: tabla AriesERP ejemplo: [ sat_regimenfiscalcfdi ] para generar un listado habra que pasar la tabla.',
        required: true,
        type: String, // Especificamos que el tipo es un número
      })
    @ApiOperation({ summary: 'AriesERP - Modulo App - listado.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP- Modulo App - listado.',
      content: {
        'application/json': {
          example: {
            "Success": true,
            "Titulo":  "OrionWS: AriesERP - Modulo App - listado.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": [
                {
                    "id": "1",
                    "descripcion": "General de Ley Personas Morales"
                }
            ],
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public lstUsoCfdi(
        @GetUser('id')    idUser: number,
        @Param('tabla')   tabla:  string
    ) {
      return this.Service.getList(idUser, tabla);
    }
  

    
    // @Post('lstDomiciliosE/:id')
    // @ApiParam({
    //     name: 'id',
    //     description: 'Filtro: Id del empleado.',
    //     required: true,
    //     type: Number, // Especificamos que el tipo es un número
    //   })
    // @ApiOperation({ summary: 'AriesERP - Modulo App - listado.' })
    // @ApiResponse({
    //   status: 200,
    //   description: 'AriesERP- Modulo App - listado.',
    //   content: {
    //     'application/json': {
    //       example: {
    //         "Success": true,
    //         "Titulo":  "OrionWS: AriesERP - Modulo App - listado.",
    //         "Mensaje": "Operacion Realizada con exito.",
    //         "Response": [
    //             {
    //                 "id": "1",
    //                 "descripcion": "General de Ley Personas Morales"
    //             }
    //         ],
    //       },
    //     },
    //   },
    // })
    // @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    // @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    // public lstDomicilios(
    //     @GetUser('id')    idUser: number,
    //     @Param('id')   id:  number
    // ) {
    //   return this.Service.getlistDomicilios(idUser, id);
    // }
  




}
