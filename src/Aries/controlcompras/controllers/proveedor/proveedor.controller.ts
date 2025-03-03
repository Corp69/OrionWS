import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
// Dtos
import { ProveedorDTO } from '../../dtos/proveedor/eccs_proveedor.dto';


@ApiTags('OrionWS - AriesERP - Modulo Compras - Proveedores.')
@Controller('arieserp/proveedor')
@Auth()
export class ProveedorController {

    constructor(private readonly Service: ProveedorService) {}


    @Post('obtener/:id')
    @ApiParam({
        name: 'id',
        description: 'Filtro: id hace referencia al proveedor,  agrega un id de un proveedor.',
        required: true,
        type: Number, // Especificamos que el tipo es un número
      })
    @ApiOperation({ summary: 'AriesERP - Modulo Compras - Proveedores - Obtener.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Compras - Obtener Proveedores.',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP - Modulo Compras - Obtener Proveedores.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
              
            },
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Compras - Proveedores - Obtener.',
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
    public getConf(@GetUser('id') idUser: number, @Param('id')   id:     number) {
      
      return this.Service.getProveedor(idUser, id);
    }


    @Get('catalogo/:id')
    @ApiParam({
          name: 'id',
          description: 'Filtro: id hace referencia al proveedor para filtrar los proveedores. ',
          required: true,
          type: Number, // Especificamos que el tipo es un número
    })
    @ApiOperation({
      summary: 'OrionWS - AriesERP - Modulo Compras - Proveedor - Catalogo.',
    })
    @ApiResponse({
      status: 200,
      description: 'OrionWS - AriesERP - Modulo Compras - Proveedor - Catalogo.',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo: 'OrionWS - AriesERP - Modulo Compras - Proveedor - Catalogo.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {},
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'OrionWS - AriesERP - Modulo Compras - Proveedor - Catalogo.',
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
    public getCatalogo(@GetUser('id') idUser: number, @Param('id') id: number) {
      return this.Service.Catalogo(idUser, id);
    }




  @Post('agregar')
    @ApiOperation({
      summary: "AriesERP - Modulo Compras - Proveedores - Agregar",
    })
    @ApiResponse({
      status: 200,
      description: "AriesERP - Modulo Compras - Proveedores - Agregar.",
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo App - Empresas Agregar",
            Mensaje:  "Operación Realizada con exito.",
            Response: "Se agrego correctamente !"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: "AriesERP - Modulo Compras - Proveedores - Agregar.",
      content: {
        'application/json': {
          example: {
            message: "No tienes Autorizacion.",
            statusCode: 401,
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'Token Invalido' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public Agregar(
      @Body() ProveedorDTO: ProveedorDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.Agregar(idUser, ProveedorDTO);
    }




  @Post('actualizar')
    @ApiOperation({
      summary: "AriesERP - Modulo Compras - Proveedores - Actualizar",
    })
    @ApiResponse({
      status: 200,
      description: "AriesERP - Modulo Compras - Proveedores - Actualizar.",
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Compras - Proveedores - Actualizar",
            Mensaje:  "Operacion Realizada con exito.",
            Response: "Se actualizo correctamente!!"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Compras - Proveedores - Actualizar.',
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
      @Body() ProveedorDTO: ProveedorDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.Actualizar(idUser, ProveedorDTO);
    }
  
    
    @Post('eliminar/:id')
    @ApiOperation({
      summary: 'AriesERP - Modulo Compras - Proveedores - Eliminar.',
    })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Compras - Proveedores - Eliminar.',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP - Modulo Compras - Proveedores - Eliminar.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: "Registro eliminado."
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Compras - Proveedores - Eliminar.',
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
