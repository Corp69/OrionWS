import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ProveedorService } from '../../services/proveedor/proveedor.service';


@ApiTags('OrionWS - AriesERP - Modulo Compras - Obtener Proveedores.')
@Controller('proveedor')
@Auth()
export class ProveedorController {

    constructor(private readonly Service: ProveedorService) {}


    @Get('obtener')
              @ApiOperation({ summary: 'AriesERP - Modulo Compras - Obtener Proveedores.' })
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
                description: 'AriesERP - Modulo Compras - Obtener Proveedores.',
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
                return this.Service.getProveedor(idUser);
              }


}
