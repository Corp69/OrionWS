import { Controller, Post, Body, Param } from '@nestjs/common';
import { SpaceService } from './space.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('OrionWS - SPACE - ECCS Presentación.')
@Controller('AriesERP/space')
export class SpaceController {

  constructor(private readonly Service: SpaceService ) {}
  
   @Post('contacto')
   @ApiOperation({ summary: 'AriesERP - Space - Contacto Obtiene los datos de contacto' })
   @ApiResponse({
     status: 200,
     description: 'OrionWS: AriesERP - Space - Contacto.',
     content: {
       'application/json': {
         example: {
           Success: true,
           Titulo: "OrionWS: AriesERP - Space - Contacto.",
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
   getContacto() {
      return this.Service.Contacto();
   }   

   @Post('vision')
   @ApiOperation({ summary: ' AriesERP - Space - Vision Obtiene los datos de vision' })
   @ApiResponse({
     status: 200,
     description: 'OrionWS: AriesERP - Space - Vision.',
     content: {
       'application/json': {
         example: {
            "Success": true,
            "Titulo": "OrionWS: AriesERP - Space - Vision.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": {
                "Vision": "En ECCS, AriesERP 2025."
            }
         },
       },
     },
   })
   @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
   @ApiResponse({ status: 500, description: 'Error interno del servidor' })
   getVision() {
      return this.Service.Vision();
   }   

   @Post('mision')
   @ApiOperation({ summary: ' AriesERP - Space - Mision Obtiene los datos de misión' })
   @ApiResponse({
     status: 200,
     description: 'OrionWS: AriesERP - Space - Vision.',
     content: {
       'application/json': {
         example: {
            "Success": true,
            "Titulo": "OrionWS: AriesERP - Space - Vision.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": {
                "Vision": "En ECCS, AriesERP 2025."
            }
         },
       },
     },
   })
   @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
   @ApiResponse({ status: 500, description: 'Error interno del servidor' })
   getMision() {
      return this.Service.Mision();
   }   


   @Post('nosotros')
   @ApiOperation({ summary: ' AriesERP - Space - Nosotros Obtiene los datos de nosotros' })
   @ApiResponse({
     status: 200,
     description: 'OrionWS: AriesERP - Space - Nosotros.',
     content: {
       'application/json': {
         example: {
            "Success": true,
            "Titulo": "OrionWS: AriesERP - Space - Nosotros.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": {
                "Vision": "En ECCS, AriesERP 2025."
            }
         },
       },
     },
   })
   @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
   @ApiResponse({ status: 500, description: 'Error interno del servidor' })
   getNosotros() {
      return this.Service.Nosotros();
   }   
 
 
   @Post('objetivo')
   @ApiOperation({ summary: ' AriesERP - Space - Objetivo Obtiene los datos de objetivo' })
   @ApiResponse({
     status: 200,
     description: 'OrionWS: AriesERP - Space - Objetivo.',
     content: {
       'application/json': {
         example: {
            "Success": true,
            "Titulo": "OrionWS: AriesERP - Space - Objetivo.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": {
                "Vision": "En ECCS, AriesERP 2025."
            }
         },
       },
     },
   })
   @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
   @ApiResponse({ status: 500, description: 'Error interno del servidor' })
   getObjetivo() {
      return this.Service.Objetivo();
   }   

}
