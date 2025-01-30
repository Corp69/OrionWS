import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { EmpleadoDTO } from '../../dtos/eccs_empleado.dto';


@ApiTags('OrionWS - AriesERP - Modulo RH - Empleados.')
@Controller('empleado')
@Auth()
export class EmpleadoController {

    constructor(private readonly Service: EmpleadoService) {}




     @Get('obtener/:id')
     @ApiOperation({ summary: 'AriesERP - Modulo RH - Empledos - Obtener.' })
     @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo RH - Empledos - Obtener',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP - Modulo RH - Empledos - Obtener.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
              
            },
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo RH - Empledos - Obtener.',
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
      return this.Service.obtenerEmpleado(idUser, id);
    }

  @Post('agregar')
    @ApiOperation({
      summary: 'AriesERP - Modulo RH - Empledos - Agregar',
    })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo RH - Empledos - Agregar',
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo App - Sucursales - Agregar",
            Mensaje:  "Operación Realizada con exito.",
            Response: "Se agrego correctamente!!"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo RH - Empledos - Agregar',
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
      @Body() EmpleadoDTO: EmpleadoDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.agregar(idUser, EmpleadoDTO);
    }

  @Post('actualizar')
    @ApiOperation({
      summary: "AriesERP - Modulo RH - Empledos - Actualizar",
    })
    @ApiResponse({
      status: 200,
      description: "AriesERP - Modulo RH - Empledos - Actualizar.",
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo RH - Empledos - Actualizar",
            Mensaje:  "Operacion Realizada con exito.",
            Response: "Se actualizo correctamente!!"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo RH - Empledos - Actualizar.',
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
      @Body() EmpleadoDTO: EmpleadoDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.actualizar(idUser, EmpleadoDTO);
    }
          
            
  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo RH - Empledos - Eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo RH - Empledos - Eliminar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'AriesERP - Modulo RH - Empledos - Eliminar',
          Mensaje: 'Operacion Realizada con exito.',
          Response: "Registro eliminado."
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo RH - Empledos - Eliminar',
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
    return this.Service.eliminar(idUser, id);
  }







}
