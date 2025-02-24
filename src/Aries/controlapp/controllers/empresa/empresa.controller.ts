import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpresaService } from '../../services/empresa/empresa.service';


import { EmpresasDTO } from '../../dtos/arieserp_empresas.dto';

@ApiTags('OrionWS - AriesERP - Modulo App.')
@Controller('arieserp/empresa')
@Auth()
export class EmpresaController {
  constructor(private readonly Service: EmpresaService) {}

  @Get('obtener/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Empresas - Obtener.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Empresas - Obtener.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Empresas - Obtener.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Empresas - Obtener.',
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
    return this.Service.getSucursal(idUser, id);
  }

  @Get('catalogo/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Empresas - Catalogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Empresas - Catalogo.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Empresas - Catalogo.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Empresas - Catalogo.',
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
  public getCatalogo(@GetUser('id') idUser: number, @Param('id') id: number) {
    return this.Service.Catalogo(idUser, id);
  }

  @Post('agregar')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Empresas Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Empresas Agregar.',
    content: {
      'application/json': {
        example: {
          Success:  true,
          Titulo:   'AriesERP - Modulo App - Empresas Agregar',
          Mensaje:  'Operación Realizada con exito.',
          Response: "Su licencia solo permite 1 empresa(s)"
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Empresas Agregar.',
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
  public Create(
    @Body() EmpresasDTO: EmpresasDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, EmpresasDTO);
  }


  @Post('actualizar')
  @ApiOperation({
    summary: "AriesERP - Modulo App - Empresas Actualizar",
  })
  @ApiResponse({
    status: 200,
    description: "AriesERP - Modulo App - Empresas Actualizar.",
    content: {
      'application/json': {
        example: {
          Success:  true,
          Titulo:   "AriesERP - Modulo App - Empresas Actualizar",
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
    description: 'AriesERP - Modulo App - Empresas Actualizar.',
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
          Response: "Registro eliminado."
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Empresas Eliminar.',
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
