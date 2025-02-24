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
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo App - listado.',
      content: {
        'application/json': {
          example: {
            message: 'No tienes Autorizacion.',
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public lstUsoCfdi(
        @GetUser('id')    idUser: number,
        @Param('tabla')   tabla:  string
    ) {
      return this.Service.getList(idUser, tabla);
    }

    //==================================================================================
    @Post('lstempresa')
    @ApiOperation({ summary: 'AriesERP - Modulo App - listado - empresa.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP- Modulo App - listado.',
      content: {
        'application/json': {
          example: {
            "Success": true,
            "Titulo":  "OrionWS: AriesERP - Modulo App - listado - empresa.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": [
                {
                    "id": "1",
                    "descripcion": "ECCS"
                }
            ],
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'OrionWS: AriesERP - Modulo App - listado - empresa.',
      content: {
        'application/json': {
          example: {
            message: 'No tienes Autorizacion.',
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public LstEmpresa(
        @GetUser('id')    idUser: number
    ) {
      return this.Service.getListEmpresas(idUser);
    }



  //==================================================================================


    @Post('lstsucursal')
    @ApiOperation({ summary: 'AriesERP - Modulo App - listado - sucursal.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP- Modulo App - listado.',
      content: {
        'application/json': {
          example: {
            "Success": true,
            "Titulo":  "OrionWS: AriesERP - Modulo App - listado - sucursal.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": [
                {
                    "id": "1",
                    "descripcion": "ECCS"
                }
            ],
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'OrionWS: AriesERP - Modulo App - listado - sucursal.',
      content: {
        'application/json': {
          example: {
            message: 'No tienes Autorizacion.',
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public lstSucursalD(
        @GetUser('id')    idUser: number
    ) {
      return this.Service.getlstSucursalD(idUser);
    }
 
    //==================================================================================


    @Post('lstdeparatmento')
    @ApiOperation({ summary: 'AriesERP - Modulo RH - listado - Departamento.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP- Modulo App - listado.',
      content: {
        'application/json': {
          example: {
            "Success": true,
            "Titulo":  "OrionWS: AriesERP - Modulo RH - listado - Departamento.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": [
                {
                    "id": "1",
                    "descripcion": "ECCS"
                }
            ],
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'OrionWS: AriesERP - Modulo RH - listado - Departamento.',
      content: {
        'application/json': {
          example: {
            message: 'No tienes Autorizacion.',
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public lstDepartamento(
        @GetUser('id')    idUser: number
    ) {
      return this.Service.getlstDepartamento(idUser);
    }
  


}
