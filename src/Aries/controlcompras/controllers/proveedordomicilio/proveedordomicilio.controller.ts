import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
//servicios
import { ProveedorDomicilioService } from '../../services/proveedordomicilio/proveedordomicilio.service';
//dtos
import { DomicilioProveedorDTO } from '../../dtos/proveedordomicilio/eccs_proveedor_domicilio.dto';




@ApiTags('OrionWS - AriesERP - Modulo Compras - Domicilio - Proveedores.')
@Controller('arieserp/proveedordomicilio')
@Auth()
export class ProveedordomicilioController {

    constructor(private readonly Service: ProveedorDomicilioService) {}

    @Get('obtener/:idproveedor/:idestatus')
    @ApiParam({
        name: 'idproveedor',
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

    @ApiOperation({ summary: 'AriesERP - Modulo Compras -  Domicilio - Proveedores - Obtener.' })
    @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo Compras - Obtener - Domicilio - Proveedores.',
    content: {
        'application/json': {
        example: {
            Success: true,
            Titulo:  'AriesERP - Modulo Compras - Obtener -  Domicilio - Proveedores.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
            
            },
        },
        },
    },
    })
    @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo Compras -  Domicilio - Proveedores - Obtener.',
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
        @GetUser('id')          idUser:             number,
        @Param('idproveedor')   idproveedor:        number,
        @Param('idestatus')     idestatus:          number,

    ) {
    
    return this.Service.obtenerdomicilio(idUser, idproveedor, idestatus);
    }




@Post('agregar')
    @ApiOperation({
    summary: "AriesERP - Modulo Compras - Domicilio - Proveedores - Agregar",
    })
    @ApiResponse({
    status: 200,
    description: "AriesERP - Modulo Compras -  Domicilio - Proveedores - Agregar.",
    content: {
        'application/json': {
        example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Compras -  Domicilio - Proveedores - Agregar",
            Mensaje:  "Operación Realizada con exito.",
            Response: "Se agrego correctamente !"
        },
        },
    },
    })
    @ApiResponse({
    status: 401,
    description: "AriesERP - Modulo Compras -  Domicilio - Proveedores - Agregar.",
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
    public agregar(
    @Body() DomicilioProveedorDTO: DomicilioProveedorDTO,
    @GetUser('id') idUser: number,
    ) {
    return this.Service.agregardomicilio(idUser, DomicilioProveedorDTO);
    }




@Post('actualizar')
    @ApiOperation({
    summary: "AriesERP - Modulo Compras - Domicilio - Proveedores - Actualizar",
    })
    @ApiResponse({
    status: 200,
    description: "AriesERP - Modulo Compras - Domicilio - Proveedores - Actualizar.",
    content: {
        'application/json': {
        example: {
            Success:  true,
            Titulo:   "AriesERP - Modulo Compras - Domicilio - Proveedores - Actualizar",
            Mensaje:  "Operacion Realizada con exito.",
            Response: "Se actualizo correctamente!!"
        },
        },
    },
    })
    @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo Compras - Domicilio - Proveedores - Actualizar.',
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
    @Body() DomicilioProveedorDTO: DomicilioProveedorDTO,
    @GetUser('id') idUser: number,
    ) {
    return this.Service.actualizardomicilio(idUser, DomicilioProveedorDTO);
    }

    
    @Post('eliminar/:id')
    @ApiOperation({
    summary: 'AriesERP - Modulo Compras - Domicilio - Proveedores - Eliminar.',
    })
    @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo Compras - Domicilio - Proveedores - Eliminar.',
    content: {
        'application/json': {
        example: {
            Success: true,
            Titulo:  'AriesERP - Modulo Compras - Domicilio - Proveedores - Eliminar.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: "Registro eliminado."
        },
        },
    },
    })
    @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo Compras - Domicilio - Proveedores - Eliminar.',
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
