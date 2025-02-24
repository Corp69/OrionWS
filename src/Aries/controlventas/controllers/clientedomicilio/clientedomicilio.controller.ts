import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ClienteDomicilioService } from '../../services/clientedomicilio/clientedomicilio.service';
import { DomicilioClienteDTO } from '../../dtos/clientesdomicilio/eccs_cliente_domicilio.dto';


@ApiTags('OrionWS - AriesERP - Modulo Ventas - Domicilio - Clientes.')
@Controller('clientedomicilio')
@Auth()
export class ClientedomicilioController {

    constructor(private readonly Service: ClienteDomicilioService ) {}
    
@Get('obtener/:id')
    @ApiOperation({ summary: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Obtener .' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Obtener .',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP - Modulo Ventas - Domicilio - Clientes - Obtener .',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
              
            },
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Obtener.',
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
      return this.Service.obtenerdomicilio(idUser, id);
    }
  
    @Post('agregar')
    @ApiOperation({
      summary: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Agregar',
    })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Agregar.',
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Ventas - Domicilio - Clientes - Agregar",
            Mensaje:  "Operación Realizada con exito.",
            Response: "Se Agrego Correctamente !"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Agregar.',
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
      @Body() DomicilioClienteDTO: DomicilioClienteDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.agregardomicilio(idUser, DomicilioClienteDTO);
    }

    @Post('actualizar')
    @ApiOperation({
      summary: "AriesERP - Modulo Ventas - Domicilio - Clientes - Actualizar",
    })
    @ApiResponse({
      status: 200,
      description: "AriesERP - Modulo Ventas - Domicilio - Clientes - Actualizar",
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Ventas - Domicilio - Clientes - Actualizar",
            Mensaje:  "Operacion Realizada con exito.",
            Response: "Se Actualizó corretamente !"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description:  "AriesERP - Modulo Ventas - Domicilio - Clientes - Actualizar",
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
      @Body() DomicilioClienteDTO: DomicilioClienteDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.actualizardomicilio(idUser, DomicilioClienteDTO);
    }
  
    @Post('eliminar/:id')
    @ApiOperation({
      summary: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Eliminar.',
    })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Ventas - Domicilio - Clientes - Eliminar.',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP -  Modulo Ventas - Domicilio - Clientes - Eliminar.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: "Registro eliminado."
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo Ventas -Domicilio - Clientes - Eliminar.',
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
      return this.Service.eliminardomicilio(idUser, id);
    }
}
