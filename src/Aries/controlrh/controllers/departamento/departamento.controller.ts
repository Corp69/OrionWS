import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
//Service
import { DepartamentoService } from '../../services/departamento/departamento.service';
// Dtos
import { DepartamentoDTO } from '../../dtos/departamento/rh_departamento.dto';


@ApiTags('OrionWS - AriesERP - Modulo RH - Departamento.')
@Controller('arieserp/departamento')
@Auth()
export class DepartamentoController {

    constructor(private readonly Service: DepartamentoService) {}


    @Get('obtener/:id')
          @ApiOperation({ summary: 'AriesERP - Modulo RH - Departamento - Obtener.' })
          @ApiResponse({
            status: 200,
            description: 'AriesERP - Modulo RH - Obtener Departamento.',
            content: {
              'application/json': {
                example: {
                  Success: true,
                  Titulo:  'AriesERP - Modulo RH - Obtener Departamento.',
                  Mensaje: 'Operacion Realizada con exito.',
                  Response: {
                    
                  },
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: 'AriesERP - Modulo RH - Departamento - Obtener.',
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
          public getConf(@GetUser('id') idUser: number, @Param('id')   id:     number) {
            
            return this.Service.getDepartamento(idUser, id);
          }




        @Post('agregar')
          @ApiOperation({
            summary: "AriesERP - Modulo RH - Departamento - Agregar",
          })
          @ApiResponse({
            status: 200,
            description: "AriesERP - Modulo RH - Departamento - Agregar.",
            content: {
              'application/json': {
                example: {
                  Success:  true,
                  Titulo:   "AriesERP - Modulo RH - Departamento Agregar",
                  Mensaje:  "Operación Realizada con exito.",
                  Response: "Se agrego correctamente !"
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: "AriesERP - Modulo RH - Departamento - Agregar.",
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
          public Agregar(
            @Body() DepartamentoDTO: DepartamentoDTO,
            @GetUser('id') idUser: number,
          ) {
            return this.Service.Agregar(idUser, DepartamentoDTO);
          }




        @Post('actualizar')
          @ApiOperation({
            summary: "AriesERP - Modulo RH - Departamento - Actualizar",
          })
          @ApiResponse({
            status: 200,
            description: "AriesERP - Modulo RH - Departamento - Actualizar.",
            content: {
              'application/json': {
                example: {
                  Success:  true,
                  Titulo:   "AriesERP - Modulo RH - Departamento - Actualizar",
                  Mensaje:  "Operacion Realizada con exito.",
                  Response: "Se actualizo correctamente!!"
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: 'AriesERP - Modulo RH - Departamento - Actualizar.',
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
            @Body() DepartamentoDTO: DepartamentoDTO,
            @GetUser('id') idUser: number,
          ) {
            return this.Service.Actualizar(idUser, DepartamentoDTO);
          }
        
          
          @Post('eliminar/:id')
          @ApiOperation({
            summary: 'AriesERP - Modulo RH - Departamento - Eliminar.',
          })
          @ApiResponse({
            status: 200,
            description: 'AriesERP - Modulo RH - Departamento - Eliminar.',
            content: {
              'application/json': {
                example: {
                  Success: true,
                  Titulo:  'AriesERP - Modulo RH - Departamento - Eliminar.',
                  Mensaje: 'Operacion Realizada con exito.',
                  Response: "Registro eliminado."
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: 'AriesERP - Modulo RH - Departamento - Eliminar.',
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
