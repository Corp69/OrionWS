import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { SucursalesService } from '../../services/sucursales/sucursales.service';


@ApiTags('OrionWS - AriesERP - Modulo App Sucursales.')
@Controller('arieserp/sucursales')
@Auth()
export class SucursalesController {

      constructor(private readonly Service: SucursalesService) {}



      
      @Get('obtener')
      @ApiOperation({ summary: 'AriesERP - Modulo App - Sucursal.' })
      @ApiResponse({
        status: 200,
        description: 'AriesERP - Modulo App - Sucursal.',
        content: {
          'application/json': {
            example: {
              Success: true,
              Titulo:  'AriesERP - Modulo App - Sucursal.',
              Mensaje: 'Operacion Realizada con exito.',
              Response: {
                
              },
            },
          },
        },
      })
      @ApiResponse({
        status: 401,
        description: 'AriesERP - Modulo App - Sucursal.',
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
        return this.Service.getSucursal(idUser);
      }


}
