import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpleadoDomicilioService } from '../../services/empleadodomicilio/empleadodomicilio.service';
import { DomicilioEmpleadoDTO } from '../../dtos/empledodomicilio/eccs_empleado_domicilio.dto';


@ApiTags('OrionWS - AriesERP - Modulo RH.')
@Controller('arieserp/empleadodomicilio')
@Auth()
export class EmpleadodomicilioController {

    constructor(private readonly Service:  EmpleadoDomicilioService) {}

    @Get('obtener/:idempleado/:idestatus')
    @ApiParam({
      name: 'idempleado',
      description: 'Filtro: ID id cliente filtra los clientes ',
      required: true,
      type: Number, // Especificamos que el tipo es un número
    })
    @ApiParam({
        name: 'idestatus',
        description: 'Filtro: ID id estatus 1 activo filtra por estatus a cliente. ',
        required: true,
        type: Number, // Especificamos que el tipo es un número
    })

      @ApiOperation({ summary: 'AriesERP - Modulo RH - Empledos Domicilio - Obtener.' })
      @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo RH - Empledos Domicilio- Obtener',
      content: {
        'application/json': {
          example: {
            Success: true,
            Titulo:  'AriesERP - Modulo RH - Empledos Domicilio- Obtener.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
              
            },
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo RH - Empledos Domicilio- Obtener.',
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
    public getConf(
      @GetUser('id')        idUser:     number, 
      @Param('idempleado')  idempleado: number,
      @Param('idestatus')   idestatus:  number,
    ) {
      return this.Service.obtenerDomicilio(idUser, idempleado, idestatus);
    }

  @Post('agregar')
    @ApiOperation({
      summary: 'AriesERP - Modulo RH - Empledos Domicilio- Agregar',
    })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo RH - Empledos Domicilio- Agregar',
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
      description: 'AriesERP - Modulo RH - Empledos Domicilio- Agregar',
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
      @Body() DomicilioEmpleadoDTO: DomicilioEmpleadoDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.agregarDomicilio(idUser, DomicilioEmpleadoDTO);
    }

  @Post('actualizar')
    @ApiOperation({
      summary: "AriesERP - Modulo RH - Empledos Domicilio- Actualizar",
    })
    @ApiResponse({
      status: 200,
      description: "AriesERP - Modulo RH - Empledos Domicilio- Actualizar.",
      content: {
        'application/json': {
          example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo RH - Empledos Domicilio- Actualizar",
            Mensaje:  "Operacion Realizada con exito.",
            Response: "Se actualizo correctamente!!"
          },
        },
      },
    })
    @ApiResponse({
      status: 401,
      description: 'AriesERP - Modulo RH - Empledos Domicilio- Actualizar.',
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
      @Body() DomicilioEmpleadoDTO: DomicilioEmpleadoDTO,
      @GetUser('id') idUser: number,
    ) {
      return this.Service.actualizarDomicilio(idUser, DomicilioEmpleadoDTO);
    }
          
            
  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo RH - Empledos Domicilio- Eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo RH - Empledos Domicilio- Eliminar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'AriesERP - Modulo RH - Empledos Domicilio- Eliminar',
          Mensaje: 'Operacion Realizada con exito.',
          Response: "Registro eliminado."
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo RH - Empledos Domicilio- Eliminar',
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
    return this.Service.eliminarDomicilio(idUser, id);
  }

      
}
