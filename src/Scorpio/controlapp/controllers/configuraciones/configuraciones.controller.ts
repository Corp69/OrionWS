import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

//modulo auth
import { Auth, GetUser } from 'src/auth/decorators';
//Servicios
import { ConfiguracionesService } from '../../services/configuraciones/configuraciones.service';


@ApiTags('OrionWS - Scorpio XL - Modulo App - Configuraciones')
@Controller('scorpio/configuraciones')
@Auth()
export class ConfiguracionesController {

    constructor(private readonly Service: ConfiguracionesService) {}

    @Post('obtener')
    @ApiOperation({ summary: 'Scorpio XL - Modulo App - Configuraciones - Obtener.' })
    @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo App - Configuraciones - Obtener.',
    content: {
        'application/json': {
        example: {
            Success: true,
            Titulo:  'Scorpio XL - Modulo App - Configuraciones - Obtener.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: {
            "conf": [
                {
                    "id": 13,
                    "decripcion": "Scorpio- Principal",
                    "config": "scorpio - Tipo de cambio",
                    "valor2": "https://openexchangerates.org/",
                    "observaciones": "tipo de cambio por MXN",
                    "activo": true,
                    "icon": null
                },
                {
                    "id": 12,
                    "decripcion": "Scorpio- Principal",
                    "config": "scorpio - Catalogo de bancos",
                    "valor2": "https://www.banxico.org.mx/",
                    "observaciones": "Esta configuracion trae el tipo de cambio de banxico",
                    "activo": true,
                    "icon": null
                }
            ]
            },
        },
        },
    },
    })
    @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo App - Empresas - Obtener.',
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
        return this.Service.getConfiguracion(idUser);
    }


}
