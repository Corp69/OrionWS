import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import{ SyncDto,
  PeticionDto  
} from '../../dtos/sync';
//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { clientHttp } from '@shared/client/clienthttp';

import { SocialService } from '../social/social.service';

@Injectable()
export class SyncService {
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
    private readonly http: clientHttp,
    private readonly socialService: SocialService
  ) {}
  
  
  public async XML_Sync( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      
      // agregar razon social con el proveedor
      const socialResponse = await this.socialService.XML_Social_Create(clientId, id);

      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "scorpio_xml".sp_build_empresa_xml(${id})`,
      );            
      // construccion de XML - create social
      const Body: SyncDto = new SyncDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[13].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.XML[2].value,
        data[0].sp_build_empresa_xml.XML[3].value
      );            
      //peticion con Axios
      const response = await this.http.httpPost(
        `${data[0].sp_build_empresa_xml.XML[5].value}`,
        JSON.stringify(Body),
      );
      
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json()
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async XML_Sync_lst( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio_xml".sp_build_empresa_xml(${id})`);
      // construccion de XML - create social
      const Body: PeticionDto = new PeticionDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.XML[2].value,
        data[0].sp_build_empresa_xml.Empresa.rfc,
        1000
        
      );
      
      //peticion con axios
      const response = await this.http.httpPost(data[0].sp_build_empresa_xml.XML[7].value, Body);
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  
}
