import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpleadoDomicilioService } from '../../services/empleadodomicilio/empleadodomicilio.service';


@ApiTags('OrionWS - AriesERP - Modulo RH.')
@Controller('arieserp/empleadodomicilio')
@Auth()
export class EmpleadodomicilioController {

    constructor(private readonly Service:  EmpleadoDomicilioService) {}

    @Post('obtener/:id')
    @ApiParam({
          name: 'id',
          description: 'Filtro: ID AriesERP - Modulo RH. Empleado Domicilios - estatus 1 =  Activos ',
          required: true,
          type: Number, // Especificamos que el tipo es un número
    })
    @ApiOperation({ summary: 'AriesERP - Modulo RH - Empleado domicilio - Obtener.' })
    @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo RH - Empleado domicilio - Obtener.',
    content: {
        'application/json': {
        example: {
            Success: true,
            Titulo:  'AriesERP - Modulo RH - Empleado domicilio - Obtener.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
                "empleadosdomicilio": [
                    {
                        "id": 1,
                        "nombre": "ELIZANDRO",
                        "calle": "Tuitlan",
                        "num_ext": "138",
                        "num_int": "",
                        "cp": "22040",
                        "pais": "MEXICO",
                        "estatus": "Activo"
                    }
                ]
            },
        },
        },
    },
    })
    @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo RH - Empleado domicilio - Obtener.',
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
        @GetUser('id') idUser: number,
        @Param('id')   id:     number
    ) {
    return this.Service.getEmpresa(idUser, id );
    }

}
