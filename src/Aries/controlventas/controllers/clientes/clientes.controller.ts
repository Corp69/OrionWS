import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ClienteService } from '../../services/clientes/cliente.service';


@ApiTags('OrionWS - AriesERP - Modulo Ventas - Obtener Clientes.')
@Controller('clientes')
@Auth()
export class ClientesController {

    constructor(private readonly Service: ClienteService) {}


    @Get('obtener')
          @ApiOperation({ summary: 'AriesERP - Modulo Ventas - Obtener Clientes.' })
          @ApiResponse({
            status: 200,
            description: 'AriesERP - Modulo Ventas - Clientes.',
            content: {
              'application/json': {
                example: {
                  Success: true,
                  Titulo:  'AriesERP - Modulo Ventas - Obtener Clientes.',
                  Mensaje: 'Operacion Realizada con exito.',
                  Response: {
                    
                  },
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: 'AriesERP - Modulo Ventas - Obtener Clientes.',
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
          public getConf(@GetUser('id') idUser: number) {
            return this.Service.getCliente(idUser);
          }
}


