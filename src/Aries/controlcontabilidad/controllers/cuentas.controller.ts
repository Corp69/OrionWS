import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { CuentasService } from '../services/cuentas.service';


//Dtos
import { Sat_cuenta_nv1DTO } from '../dtos/sat_cuenta_nv1.dto';
import { Sat_cuenta_nv2DTO } from '../dtos/sat_cuenta_nv2.dto';

@ApiTags('OrionWS - AriesERP - Modulo Configuraciones.')
@Controller('arieserp/cuentas')
@Auth()
export class CuentasController {

  constructor(private readonly Service: CuentasService ) {}
  
    @Post('activas/:id')
    @ApiParam({
      name: 'id',
      description: 'Filtro: ID AriesERP - Modulo Configuraciones. 0 = TODAS ',
      required: true,
      type: Number, // Especificamos que el tipo es un número
    })
    @ApiOperation({ summary: 'AriesERP - Modulo Configuraciones - Activas.' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Configuraciones - Activas.',
      content: {
        'application/json': {
          example: {
             "Success": true,
             "Titulo": "AriesERP - Modulo Configuraciones - Configuraciones Activas.",
             "Mensaje": "Operacion Realizada con exito.",
             "Response": {
              "data": [
                {
                    "id": 1,
                    "id_aries_config_modulo": 1,
                    "descripcion": "Aries- Principal",
                    "config": "AriesERP - calculadora",
                    "icon": null,
                    "observaciones": "Habilita la calculadora integrada de arieserp ",
                    "activo": true
                }
              ]
             }
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'No tienes permiso | token' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    getConf( @GetUser('id') idUser: number, @Param('id') id: number ) {
       return this.Service.Configuraciones( idUser, id );
    }  

    @Post('cuentas/:id')
    @ApiParam({
      name: 'id',
      description: 'Filtro: id es el codigo de la cuenta nv1  para hacer filtro en cuentas nivel nv2 del SAT.',
      required: true,
      type: String, // Especificamos que el tipo es un String
    })
    @ApiOperation({ summary: 'AriesERP - Modulo Contabilidad - Cuentas - Obtener' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Contabilidad - Cuentas - Obtener',
      content: {
        'application/json': {
          example: {
             "Success": true,
             "Titulo": "AriesERP - Modulo Contabilidad - Cuentas - Obtener.",
             "Mensaje": "Operacion Realizada con exito.",
             "Response": {
              "data":  [{"idnv1":"101","nivelnv1":1,"codigonv1":"101","cuentanv1":"Caja","activanv1":true,"idnv2":"101.01","nivelnv2":2,"id_sat_cuenta_nv1":"101","codigonv2":"101.01","cuentanv2":"Caja y efectivo","activanv2":true}]
             }
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'No tienes permiso | token' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public  getCuentas( 
        @GetUser('id') idUser: number,
        @Param('id') id: string
      ) {
       return this.Service.getCuentas( idUser, id );
    }  

    @Post('cuentasnv1')
    @ApiOperation({ summary: 'AriesERP - Modulo Contabilidad - cuentas lv1 - lista' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Contabilidad - cuentas lv1 - lista',
      content: {
        'application/json': {
          example: {
             "Success": true,
             "Titulo": "AriesERP - Modulo Contabilidad - cuentas lv1 - lista.",
             "Mensaje": "Operacion Realizada con exito.",
             "Response": {
              "data":  [{"idnv1":"101","nivelnv1":1,"codigonv1":"101","cuentanv1":"Caja","activanv1":true,"idnv2":"101.01","nivelnv2":2,"id_sat_cuenta_nv1":"101","codigonv2":"101.01","cuentanv2":"Caja y efectivo","activanv2":true}]
             }
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'No tienes permiso | token' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public  getCuentasNv1( @GetUser('id') idUser: number ) {
      return this.Service.getCuentasnv1( idUser );
    }  
 
    @Post('actualizarnv1')
    @ApiOperation({ summary: 'AriesERP - Modulo Contabilidad - cuentas lv1 - Actualizar' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Contabilidad - cuentas lv1 - Actualizar',
      content: {
        'application/json': {
          example: {
             "Success": true,
             "Titulo": "AriesERP - Modulo Contabilidad - cuentas lv1 - Actualizar.",
             "Mensaje": "Operacion Realizada con exito.",
             "Response": "Se Actualizó correctamente !"
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'No tienes permiso | token' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public  ActualizarCuentaNV1( 
      @GetUser('id') idUser: number,
      @Body() Sat_cuenta_nv1DTO: Sat_cuenta_nv1DTO
    ) {
      return this.Service.ActualizarCuentaNV1( idUser, Sat_cuenta_nv1DTO );
    }  
 
    @Post('actualizarnv2')
    @ApiOperation({ summary: 'AriesERP - Modulo Contabilidad - cuentas lv2 - Actualizar' })
    @ApiResponse({
      status: 200,
      description: 'AriesERP - Modulo Contabilidad - cuentas lv2 - Actualizar',
      content: {
        'application/json': {
          example: {
            "Success": true,
            "Titulo": "AriesERP - Modulo Contabilidad - cuentas lv2 - Actualizar.",
            "Mensaje": "Operacion Realizada con exito.",
            "Response": "Se Actualizó correctamente !"
          },
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
    @ApiResponse({ status: 401, description: 'No tienes permiso | token' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    public  ActualizarCuentaNV2( 
      @GetUser('id') idUser: number,
      @Body() Sat_cuenta_nv2DTO: Sat_cuenta_nv2DTO
    ) {
      return this.Service.ActualizarCuentaNV2( idUser, Sat_cuenta_nv2DTO );
    }  
 
   
}
