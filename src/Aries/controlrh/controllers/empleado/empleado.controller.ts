import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpleadoService } from '../../services/empleado/empleado.service';


@ApiTags('OrionWS - AriesERP - Modulo RH - Obtener Empleados.')
@Controller('empleado')
@Auth()
export class EmpleadoController {

    constructor(private readonly Service: EmpleadoService) {}

     @Get('obtener')
                  @ApiOperation({ summary: 'AriesERP - Modulo RH - Obtener Empleados.' })
                  @ApiResponse({
                    status: 200,
                    description: 'AriesERP - Modulo RH - Obtener Empleados.',
                    content: {
                      'application/json': {
                        example: {
                          Success: true,
                          Titulo:  'AriesERP - Modulo RH - Obtener Empleados.',
                          Mensaje: 'Operacion Realizada con exito.',
                          Response: {
                            
                          },
                        },
                      },
                    },
                  })
                  @ApiResponse({
                    status: 401,
                    description: 'AriesERP - Modulo RH - Obtener Empleados.',
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
                    return this.Service.getEmpleado(idUser);
                  }
}
