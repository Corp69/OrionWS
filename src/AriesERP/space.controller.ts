import { Controller, Post, Body, Param } from '@nestjs/common';
import { SpaceService } from './space.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('AriesERP - SPACE - Modulo Presentación.')
@Controller('space')
export class SpaceController {

  constructor(private readonly Service: SpaceService ) {}
  
  
   @Post('contacto')
   @ApiResponse({ status: 200, description: 'OrionWS - Peticion Creada de forma Exitosa!' })
   @ApiResponse({ status: 404, description: 'OrionWS - Ruta Deshabilitada' })
   getContacto() {
     return { "msj": true } //this.Service.create( createUserDto );
   }   



}
