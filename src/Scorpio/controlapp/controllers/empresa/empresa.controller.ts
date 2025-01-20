import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//dtos
import { EmpresasDTO } from '../../dtos/empresa/empresas.dto'
// modulo - decorador
import { Auth, GetUser } from 'src/auth/decorators';
//services
import { EmpresasService } from '../../services/empresas/empresas.service';

@ApiTags('OrionWS - Scorpio XL - Modulo App - Empresas')
@Controller('scorpio/empresas')
@Auth()
export class EmpresaController {
  constructor(private readonly Service: EmpresasService) {}

  @Get('obtener')
  @ApiOperation({ summary: 'Scorpio XL - Modulo App - Empresas.' })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo App - Empresas.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'Scorpio XL - Modulo App - Empresas.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {
            empresas: [
              {
                "rfc": "CACE970323V71",
                "nombrecomercial": "DEVELOPER",
                "regimen": "General de Ley Personas Morales",
                "id_regimen": 1,
                "usocfdi": "Adquisición de mercancias",
                "id_usocfdi": 1,
                "estatus": "Activo",
                "icon": "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNElEQVR4nO2UvUoDQRSFPxFFRDQ7maidjYgGYnY2CIKKWqggYqFYqYVg7xMIvoews0OCxT6UjU+QQlYLXZn8ESGI2R0byelmiu9w7rkzMNL/U8rY7GNZ/A08vhiXod+Q2v+QYWXHObyoq09S+6kMq01p1lecwqX261240MHmCM7QYylEqulF6lXU/fKwhYrfzNzCPROknlHJjyZxBriVMGrNwlsmkXrzGrXKAPhkrm0p6tpqn8l7SW/4/XARqefcqzjQJG7D7Z2TPbcd9EyMSgpavXQMP509om9JTBvuhbVbXKqVJFKJFwXu4T0dLMxPH5ds2ROukCfAFrAHHAEPwH7nvAzYDq5twKwGZ8AdcAMsAlfAKWD/93vAjmoOOM+ToJviEFDANjAF7AJLwCUwk9XAqb4A04+am93uALIAAAAASUVORK5CYII=\">"
              }
            ],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo App - Empresas.',
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
    return this.Service.getEmpresa(idUser);
  }

  @Post('agregar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo App - Razon Social Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo App - Razon Social Agregar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo App - Razon Social Agregar',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
                id: 1,
                rfc: 'CAVA03231997ECCS',
                observaciones: 'empresa de inovacion',
                nombrecomercial: 'ECCS',
                aviso_privacidad: 'X',
                id_sat_usocfdi: 1,
                id_sat_regimenfiscal: 1,
                id_estatus: 1,
                celular: '+524651068560',
                maxcomprobantesmensual: 1000,
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Create(
    @Body() EmpresasDTO: EmpresasDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, EmpresasDTO);
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo App - Razon Social Actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo App - Razon Social Actualizar.',
    content: {
      'application/json': {
          example: {
              Success: true,
              Titulo:  "OrionWS: Scorpio XL - Modulo App - Empresas Actualizar",
              Mensaje: "Operación realizada con éxito.",
              Response: {
                  id:                   1,
                  rfc:                  "CAVA102344FFK",
                  observaciones:        "test",
                  nombrecomercial:      "Opticas Zac",
                  aviso_privacidad:     "X",
                  id_sat_usocfdi:       1,
                  id_sat_regimenfiscal: 1,
                  id_estatus:           1,
                  celular:              "+524651068560",
                  maxcomprobantesmensual: 1000
            }
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Update(
    @GetUser('id') idUser: number,
    @Body() EmpresasDTO: EmpresasDTO,
  ) {
    return this.Service.Actualizar(idUser, EmpresasDTO);
  }

  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'Scorpio XL - Modulo App - Empresas Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo App - Empresas Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'Scorpio XL - Modulo App - Empresas Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: "Registro eliminado."
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo App - Empresas Eliminar.',
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
    return this.Service.Eliminar(idUser, id);
  }

}
