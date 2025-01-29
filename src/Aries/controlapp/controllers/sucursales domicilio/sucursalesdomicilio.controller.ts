import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';

//services
import { SucursalesDomiciliosService } from '../../services/sucursalesdomicilio/sucursalesdomicilio.service';
//dtos
import { DomicilioSucursalDTO } from '../../dtos/arieserpsucursaldomicilio.dto';



@ApiTags('OrionWS - AriesERP - Modulo App - Sucursales Domicilio.')
@Controller('arieserp/sucursalesdomicilio')
@Auth()
export class SucursalesDomicilioController {

    constructor(private readonly Service: SucursalesDomiciliosService) {}



    
    @Get('obtener/:id')
    @ApiOperation({ summary: 'OrionWS - AriesERP - Modulo App - Sucursales Domiclio - Obtener.' })
    @ApiResponse({
      status: 200,
      description: 'OrionWS - AriesERP - Modulo App - Sucursales Domiclio - Obtener.',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'OrionWS - AriesERP - Modulo App - Sucursales Domiclio - Obtener.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
              
            },
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'OrionWS - AriesERP - Modulo App - Sucursales Domiclio - Obtener.',
      content: {
        'application/json': {
          example: {
            message: 'No tienes Autorizacion.',
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public getConf(@GetUser('id') idUser: number, @Param('id') id: number) {
      return this.Service.obtenerDomicilioSucursal(idUser, id);
    }


  @Post('agregar')
    @ApiOperation({
      summary: 'OrionWS - AriesERP - Modulo App - Sucursales Domiclio - Agregar',
    })
    @ApiResponse({
      status: 200,
      description: 'OrionWS - AriesERP - Modulo App - Sucursales Domiclio - Agregar',
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "OrionWS - AriesERP - Modulo App - Sucursales Domicilio - Agregar",
            Mensaje:  "Operación Realizada con exito.",
            Response: "Se agrego correctamente!!"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'OrionWS - AriesERP - Modulo App - Sucursales Domiclio - Agregar',
      content: {
        'application/json': {
          example: {
            message: 'No tienes Autorizacion.',
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public Crear(
      @Body() DomicilioSucursalDTO: DomicilioSucursalDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.Agregar(idUser, DomicilioSucursalDTO);
    }

  @Post('actualizar')
    @ApiOperation({
      summary: "AriesERP - Modulo Compras - Sucursales Domicilio - Actualizar",
    })
    @ApiResponse({
      status: 200,
      description: "AriesERP - Modulo Compras - Sucursales Domicilio - Actualizar.",
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Compras - Sucursales Domicilio - Actualizar",
            Mensaje:  "Operacion Realizada con exito.",
            Response: "Se actualizo correctamente!!"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Compras - Sucursales Domicilio - Actualizar.',
      content: {
        'application/json': {
          example: {
            message: 'No tienes Autorizacion.',
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public Actualizar(
      @Body() DomicilioSucursalDTO: DomicilioSucursalDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.Actualizar(idUser, DomicilioSucursalDTO);
    }
          
            
  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo Compras - Sucursales Domicilio - Eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo Compras - Sucursales Domicilio - Eliminar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'AriesERP - Modulo Compras - Sucursales Domicilio - Eliminar',
          Mensaje: 'Operacion Realizada con exito.',
          Response: "Registro eliminado."
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo Compras - Sucursales Domicilio - Eliminar',
    content: {
      'application/json': {
        example: {
          message: 'No tienes Autorizacion.',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public eliminar(
    @GetUser('id') idUser: number,
    @Param('id')   id:     number
  ) {
    return this.Service.Eliminar(idUser, id);
  }

}
