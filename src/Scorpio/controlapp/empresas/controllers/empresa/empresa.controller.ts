import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpresasService } from '../../services/empresas/empresas.service';


@ApiTags('OrionWS - Scorpio XL - Modulo App.')
@Controller('scorpio/empresa')
@Auth()
export class EmpresaController {


    constructor(private readonly Service: EmpresasService ) {}
          
     @Get('Obtener')
            @ApiParam({
              name: 'id',
              description: 'Filtro: ID ScorpioXL - Modulo App. 0 = TODAS ',
              required: true,
              type: Number, // Especificamos que el tipo es un número
            })
            @ApiOperation({ summary: 'ScorpioXL - Modulo App - Activas.' })
            @ApiResponse({
              status: 200,
              description: 'ScorpioXL - Modulo App - Activas.',
              content: {
                'application/json': {
                  example: {
                      "Success": true,
                      "Titulo": "OrionWS: Scorpio XL - Modulo App - Empresas.",
                      "Mensaje": "Operacion Realizada con exito.",
                      "Response": 
                      {
                          "empresas": [
                              {
                                  "rfc": "CACE970323V71",
                                  "nombrecomercial": "DEVELOPER",
                                  "estatus": "Activo",
                                  "icon": "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNElEQVR4nO2UvUoDQRSFPxFFRDQ7maidjYgGYnY2CIKKWqggYqFYqYVg7xMIvoews0OCxT6UjU+QQlYLXZn8ESGI2R0byelmiu9w7rkzMNL/U8rY7GNZ/A08vhiXod+Q2v+QYWXHObyoq09S+6kMq01p1lecwqX261240MHmCM7QYylEqulF6lXU/fKwhYrfzNzCPROknlHJjyZxBriVMGrNwlsmkXrzGrXKAPhkrm0p6tpqn8l7SW/4/XARqefcqzjQJG7D7Z2TPbcd9EyMSgpavXQMP509om9JTBvuhbVbXKqVJFKJFwXu4T0dLMxPH5ds2ROukCfAFrAHHAEPwH7nvAzYDq5twKwGZ8AdcAMsAlfAKWD/93vAjmoOOM+ToJviEFDANjAF7AJLwCUwk9XAqb4A04+am93uALIAAAAASUVORK5CYII=\">"
                              }
                          ]
                      }
                  },
                },
              },
            })
            @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
            @ApiResponse({ status: 500, description: 'Error interno del servidor' })
            getConf( @GetUser('id') idUser: number ) {
               return this.Service.getEmpresa( idUser );
            }  



}
