import { Controller, Post, Body, Param } from '@nestjs/common';
import { SpaceService } from './space.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('AriesERP - SPACE - Modulo Presentación.')
@Controller('AriesERP/space')
export class SpaceController {

  constructor(private readonly Service: SpaceService ) {}
  
   @Post('contacto')
   @Post()
   @ApiOperation({ summary: 'Obtiene los datos de contacto' })
   @ApiResponse({
     status: 200,
     description: 'Contacto obtenido correctamente',
     content: {
       'application/json': {
         example: {
           Success: true,
           Titulo: "OrionWS webservice - Modulo - Authenticacion.",
           Mensaje: "Operacion Realizada con exito.",
           Response: {
             Nombre: "Elizandro Carballo Casillas",
             Empresa: "ECCS",
             Telefono: "+52 465 106 8560",
             Correo: "elizandro.carballo.casillas@eccs.com.mx",
             Mensaje:
               " Proyecto en Curso: AriesERP 2025.",
           },
         },
       },
     },
   })
   @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
   @ApiResponse({ status: 500, description: 'Error interno del servidor' })
   @ApiOperation({ summary: 'OrionWS: AriesERP - Space - Datos de contacto' })
   getContacto() {
      return this.Service.Contacto();
   }   



}
