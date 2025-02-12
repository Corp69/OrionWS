import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
//Service
import { PuestoService } from '../../services/puesto/puesto.service';
// Dtos
import { PuestoDTO } from '../../dtos/puesto/rh_puesto.dto';

@ApiTags('OrionWS - AriesERP - Modulo RH - Puesto.')
@Controller('arieserp/puesto')
@Auth()
export class PuestoController {

    constructor(private readonly Service: PuestoService) {}


    @Get('obtener/:id')
          @ApiOperation({ summary: 'AriesERP - Modulo RH - Puesto - Obtener.' })
          @ApiResponse({
            status: 200,
            description: 'AriesERP - Modulo RH - Obtener Puesto.',
            content: {
              'application/json': {
                example: {
                  Success: true,
                  Titulo:  'AriesERP - Modulo RH - Obtener Puesto.',
                  Mensaje: 'Operacion Realizada con exito.',
                  Response: {
                    
                  },
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: 'AriesERP - Modulo RH - Puesto - Obtener.',
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
            
            return this.Service.getPuesto(idUser, id);
          }




        @Post('agregar')
          @ApiOperation({
            summary: "AriesERP - Modulo RH - Puesto - Agregar",
          })
          @ApiResponse({
            status: 200,
            description: "AriesERP - Modulo RH - Puesto - Agregar.",
            content: {
              'application/json': {
                example: {
                  Success:  true,
                  Titulo:   "AriesERP - Modulo RH - Puesto Agregar",
                  Mensaje:  "Operación Realizada con exito.",
                  Response: "Se agrego correctamente !"
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: "AriesERP - Modulo RH - Puesto - Agregar.",
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
            @Body() PuestoDTO: PuestoDTO,
            @GetUser('id') idUser: number,
          ) {
            return this.Service.Agregar(idUser, PuestoDTO);
          }




        @Post('actualizar')
          @ApiOperation({
            summary: "AriesERP - Modulo RH - Puesto - Actualizar",
          })
          @ApiResponse({
            status: 200,
            description: "AriesERP - Modulo RH - Puesto - Actualizar.",
            content: {
              'application/json': {
                example: {
                  Success:  true,
                  Titulo:   "AriesERP - Modulo RH - Puesto - Actualizar",
                  Mensaje:  "Operacion Realizada con exito.",
                  Response: "Se actualizo correctamente!!"
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: 'AriesERP - Modulo RH - Puesto - Actualizar.',
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
            @Body() PuestoDTO: PuestoDTO,
            @GetUser('id') idUser: number,
          ) {
            return this.Service.Actualizar(idUser, PuestoDTO);
          }
        
          
          @Post('eliminar/:id')
          @ApiOperation({
            summary: 'AriesERP - Modulo RH - Puesto - Eliminar.',
          })
          @ApiResponse({
            status: 200,
            description: 'AriesERP - Modulo RH - Puesto - Eliminar.',
            content: {
              'application/json': {
                example: {
                  Success: true,
                  Titulo:  'AriesERP - Modulo RH - Puesto - Eliminar.',
                  Mensaje: 'Operacion Realizada con exito.',
                  Response: "Registro eliminado."
                },
              },
            },
          })
          @ApiResponse({
            status: 401,
            description: 'AriesERP - Modulo RH - Puesto - Eliminar.',
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
