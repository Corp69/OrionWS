import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListadoService } from '@shared/Scorpio/services/listado/listado.service';
import { Auth, GetUser } from 'src/auth/decorators';

@ApiTags('OrionWS - Scorpio XL - Modulo App. [ rutas compartidas ]')
@Controller('scorpio/shared')
@Auth()
export class ListadoController {
     constructor(private readonly Service: ListadoService) {}
        
    @Post('lst/:tabla')
    @ApiParam({
        name: 'tabla',
        description: 'Filtro: tabla Scorpio XL ejemplo: [ sat_regimenfiscalcfdi ] para generar un listado habra que pasar la tabla.',
        required: true,
        type: String, // Especificamos que el tipo es un número
        })
    @ApiOperation({ summary: 'Scorpio XL - Modulo App - listado.' })
    @ApiResponse({
        status: 200,
        description: 'Scorpio XL- Modulo App - listado.',
        content: {
        'application/json': {
            example: {
            "Success": true,
            "Titulo":  "Scorpio XL - Modulo App - listado.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": [
                {
                    "id": "1",
                    "descripcion": "General de Ley Personas Morales"
                }
            ],
            },
        },
        },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public lstUsoCfdi(
        @GetUser('id')    idUser: number,
        @Param('tabla')   tabla:  string
    ) {
        return this.Service.getList(idUser, tabla);
    }
    

}
