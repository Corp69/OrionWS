import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
//dtos
import { SolicitaDto } from '../../dtos/solicitudes/solicitudes.dto'

@ApiTags('OrionWS - Scorpio XL - Modulo App - Solicitudes')
@Controller('scorpio/solicitudes')
@Auth()
export class SolicitudController {

    constructor(private readonly Service: SolicitudService) { }

    @Get('consulta/:id')
    @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Consulta la metdata',
    })
    @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Consulta la metdata.',
    content: {
        'application/json': {
        example: {
            Success: true,
            Titulo: 'Scorpio XL - Modulo XML - Consulta la metdata',
            Mensaje: 'Operación Realizada con exito.',
            Response: {
            codigo: 0,
            mensaje: 'No se encontró el parámetro userPade, favor de verificar',
            respuesta: '',
            },
        },
        },
    },
    })
    @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo XML - Consulta la metdata.',
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
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public XML_Comprobante(
    @GetUser('id') idUser: number,
    @Param('id') id: number
    ) {
    return this.Service.getSolicitud(idUser, id);
    }

    @Post('agregar/:id')
    
    @ApiOperation({
        summary: 'Scorpio XL - Modulo App - Agregar Solicitud Metadata.',
    })
    @ApiResponse({
        status: 200,
        description: 'Scorpio XL - Modulo App - Agregar Solicitud Metadata.',
        content: {
        'application/json': {
            example: {
            Success: true,
            Titulo: 'Scorpio XL - Modulo App - Agregar Solicitud Metadata',
            Mensaje: 'Operación Realizada con exito.',
            Response: {
                codigo: 0,
                mensaje: 'No se encontró el parámetro userPade, favor de verificar',
                respuesta: '',
            },
            },
        },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Scorpio XL - Modulo App - Agregar Solicitud Metadata.',
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
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public Agregar(
        @Body() SolicitaDto: SolicitaDto,
        @GetUser('id') idUser: number,
        @Param('id') id: number
        
    ) {
        return this.Service.Agregar(idUser, id, SolicitaDto);
    }



}
