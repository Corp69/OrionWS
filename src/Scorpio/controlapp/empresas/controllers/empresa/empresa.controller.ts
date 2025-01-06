import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { EmpresasDTO } from '../../dtos/empresas.dto';

@ApiTags('OrionWS - Scorpio XL - Modulo App.')
@Controller('scorpio/empresa')
@Auth()
export class EmpresaController {
  constructor(private readonly Service: EmpresasService) {}

  @Get('Obtener')
  @ApiOperation({ summary: 'ScorpioXL - Modulo App - Empresas Obtener.' })
  @ApiResponse({
    status: 200,
    description: 'ScorpioXL - Modulo App - Empresa Obtener.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo App - Empresas.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {
            empresas: [
              {
                rfc: 'CACE970323V71',
                nombrecomercial: 'DEVELOPER',
                estatus: 'Activo',
                icon: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNElEQVR4nO2UvUoDQRSFPxFFRDQ7maidjYgGYnY2CIKKWqggYqFYqYVg7xMIvoews0OCxT6UjU+QQlYLXZn8ESGI2R0byelmiu9w7rkzMNL/U8rY7GNZ/A08vhiXod+Q2v+QYWXHObyoq09S+6kMq01p1lecwqX261240MHmCM7QYylEqulF6lXU/fKwhYrfzNzCPROknlHJjyZxBriVMGrNwlsmkXrzGrXKAPhkrm0p6tpqn8l7SW/4/XARqefcqzjQJG7D7Z2TPbcd9EyMSgpavXQMP509om9JTBvuhbVbXKqVJFKJFwXu4T0dLMxPH5ds2ROukCfAFrAHHAEPwH7nvAzYDq5twKwGZ8AdcAMsAlfAKWD/93vAjmoOOM+ToJviEFDANjAF7AJLwCUwk9XAqb4A04+am93uALIAAAAASUVORK5CYII=">',
              },
            ],
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public getConf(@GetUser('id') idUser: number) {
    return this.Service.getEmpresa(idUser);
  }

  @Post('agregar')
  @ApiOperation({
    summary: 'ScorpioXL - Modulo App - Empresas agregar.',
  })
  @ApiResponse({
    status: 200,
    description: 'ScorpioXL - Modulo App - Empresas agregar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'ScorpioXL - Modulo App - Empresas agregar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {
            Success: true,
            Titulo: 'ECCS: AriesERP - Actualizaciones.',
            Mensaje: 'Operación Realizada con éxito.',
            Response: 'Verificar el codigo de seguridad.',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'ECCS: AriesERP - Actualizaciones.',
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
  public agregar(
    @Body() EmpresasDTO: EmpresasDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, EmpresasDTO);
  }


  @Post('actualizar')
  @ApiOperation({
    summary: 'ScorpioXL - Modulo App - Empresas agregar.',
  })
  @ApiResponse({
    status: 200,
    description: 'ScorpioXL - Modulo App - Empresas actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'ScorpioXL - Modulo App - Empresas actualizar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {
            Success: true,
            Titulo: 'ECCS: AriesERP - Actualizaciones.',
            Mensaje: 'Operación Realizada con éxito.',
            Response: 'Verificar el codigo de seguridad.',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'ECCS: AriesERP - Actualizaciones.',
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
  public Actualizar(
    @Body() EmpresasDTO: EmpresasDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, EmpresasDTO);
  }

  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'ScorpioXL - Modulo App - Empresas Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'ScorpioXL - Modulo App - Empresas Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'ScorpioXL - Modulo App - Empresas Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {
            Success: true,
            Titulo: 'ECCS: AriesERP - Actualizaciones.',
            Mensaje: 'Operación Realizada con éxito.',
            Response: 'Verificar el codigo de seguridad.',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'ECCS: AriesERP - Actualizaciones.',
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
