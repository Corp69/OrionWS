import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpresaService } from '../../services/empresa/empresa.service';


import { EmpresasDTO } from '../../dtos/empresas.dto';

@ApiTags('OrionWS - AriesERP - Modulo App.')
@Controller('arieserp/empresa')
@Auth()
export class EmpresaController {
  constructor(private readonly Service: EmpresaService) {}


  @Get('Obtener')
  @ApiOperation({ summary: 'OrionWS: AriesERP - Modulo App - Empresas.' })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: AriesERP - Modulo App - Empresas.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'OrionWS: AriesERP - Modulo App - Empresas.',
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
    description: 'OrionWS: AriesERP - Modulo App - Empresas.',
    content: {
      'application/json': {
        example: {
          message: 'Unauthorized',
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
    summary: 'OrionWS: AriesERP - Modulo App - Empresas Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: AriesERP - Modulo App - Empresas Agregar.',
    content: {
      'application/json': {
        example: {
          Success:  true,
          Titulo:   'OrionWS: AriesERP - Modulo App - Empresas Agregar',
          Mensaje:  'Operación Realizada con exito.',
          Response: "Su licencia solo permite 1 empresa(s)"
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS: AriesERP - Modulo App - Empresas Agregar.',
    content: {
      'application/json': {
        example: {
          message: 'Unauthorized',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Create(
    @Body() EmpresasDTO: EmpresasDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, EmpresasDTO);
  }


  @Post('actualizar')
  @ApiOperation({
    summary: "OrionWS: AriesERP - Modulo App - Empresas Actualizar",
  })
  @ApiResponse({
    status: 200,
    description: "OrionWS: AriesERP - Modulo App - Empresas Actualizar.",
    content: {
      'application/json': {
        example: {
          Success:  true,
          Titulo:   "OrionWS: AriesERP - Modulo App - Empresas Actualizar",
          Mensaje:  "Operacion Realizada con exito.",
          Response: {
              "id":                   1,
              "rfc":                  "CAVA23197ECCS",
              "observaciones":        "s",
              "nombrecomercial":      "Opticas Zac",
              "aviso_privacidad":     "x",
              "id_sat_usocfdi":       1,
              "id_sat_regimenfiscal": 1,
              "id_estatus":           1,
              "celular":              "+524651068560"
          }
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS: AriesERP - Modulo App - Empresas Actualizar.',
    content: {
      'application/json': {
        example: {
          message: 'Unauthorized',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Update(
    @Body() EmpresasDTO: EmpresasDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Actualizar(idUser, EmpresasDTO);
  }

  
  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Empresas Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Empresas Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'AriesERP - Modulo App - Empresas Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {
            Success: true,
            Titulo:  'Registro eliminado',
            Mensaje: 'Operación Realizada con éxito.'
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS: AriesERP - Modulo App - Empresas Eliminar.',
    content: {
      'application/json': {
        example: {
          message: 'Unauthorized',
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
