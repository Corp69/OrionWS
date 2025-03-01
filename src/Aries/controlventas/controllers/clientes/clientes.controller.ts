import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
//Services
import { ClienteService } from '../../services/clientes/cliente.service';
//Dtos
import { ClienteDTO } from '../../dtos/clientes/eccs_cliente.dto';


@ApiTags('OrionWS - AriesERP - Modulo Ventas - Clientes.')
@Controller('clientes')
@Auth()
export class ClientesController {

  constructor(private readonly Service: ClienteService) {}

    @Post('obtener/:id')
    @ApiParam({
        name: 'id',
        description: 'Filtro: id hace referencia al cliente, agrega un id de un cliente.',
        required: true,
        type: Number, // Especificamos que el tipo es un número
      })
    @ApiOperation({ summary: 'AriesERP - Modulo Ventas - Clientes - Obtener .' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Ventas - Clientes - Obtener .',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP - Modulo Ventas - Clientes - Obtener .',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
              
            },
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Ventas - Clientes - Obtener.',
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
      return this.Service.getCliente(idUser, id);
    }
  
    @Post('agregar')
    @ApiOperation({
      summary: 'AriesERP - Modulo Ventas - Clientes - Agregar',
    })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Ventas - Clientes - Agregar.',
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Ventas - Clientes - Agregar",
            Mensaje:  "Operación Realizada con exito.",
            Response: "Se Agrego Correctamente !"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Ventas - Clientes - Agregar.',
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
    public Agregor(
      @Body() ClienteDTO: ClienteDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.Agregar(idUser, ClienteDTO);
    }

    @Post('actualizar')
    @ApiOperation({
      summary: "AriesERP - Modulo Ventas - Clientes - Actualizar",
    })
    @ApiResponse({
      status: 200,
      description: "AriesERP - Modulo Ventas - Clientes - Actualizar",
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Ventas - Clientes - Actualizar",
            Mensaje:  "Operacion Realizada con exito.",
            Response: "Se Actualizó corretamente !"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description:  "AriesERP - Modulo Ventas - Clientes - Actualizar",
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
      @Body() ClienteDTO: ClienteDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.Actualizar(idUser, ClienteDTO);
    }
  
    @Post('eliminar/:id')
    @ApiOperation({
      summary: 'AriesERP - Modulo Ventas - Clientes - Eliminar.',
    })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Ventas - Clientes - Eliminar.',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP -  Modulo Ventas - Clientes - Eliminar.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: "Registro eliminado."
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Ventas - Clientes - Eliminar.',
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


