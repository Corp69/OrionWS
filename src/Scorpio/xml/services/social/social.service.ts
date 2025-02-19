import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// entidad
import { scorpio_empresa } from '../../../controlapp/entities/empresa/scorpio_empresa.entity';
//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { ResponseDto } from '@shared/dtos/Response.dto';
//dtos
import { CiecDTO, FielDTO } from '../../dtos/social/socialcreate.dto';
import {
  SocialCreateDto,
  SocialDeleteDto,
  SocialLstDto,
  SocialUpdateDto
} from '../../dtos/social';
import { httpClienteService } from '@shared/http/httpClienteService';


@Injectable()
export class SocialService {
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
    private readonly http: httpClienteService
  ) {}

  public async XML_Social_Lst( clientId: number, id: number ):Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio_xml".sp_build_empresa_xml(${id})`);
      // construccion de XML - create social
      const Body: SocialLstDto = new SocialLstDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.XML[2].value
      );
      
    //peticion con axios
    const response = await this.http.HttpPost(Body , data[0].sp_build_empresa_xml.XML[7].value);

    return {
      Success: true,
      Titulo:  'Scorpio XL - Modulo XML - Razon Social Lista',
      Mensaje: 'Operacion Realizada con exito.',
      Response: await response
    };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Razon Social Lista',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Create( clientId: number,  id: number ):Promise<ResponseDto<any>> {
    try { 
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio_xml".sp_build_empresa_xml(${id})`);
      // construccion de XML - create social
      const SocialCreate: SocialCreateDto = new SocialCreateDto(
        
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.XML[2].value,
        data[0].sp_build_empresa_xml.Empresa.nombrecomercial,
        data[0].sp_build_empresa_xml.Empresa.fechainiciosync,
        data[0].sp_build_empresa_xml.Empresa.maxcomprobantesmensual,
        data[0].sp_build_empresa_xml.Empresa.celular,
        
        new FielDTO(
                    data[0].sp_build_empresa_xml.Empresa.pfx, 
                    data[0].sp_build_empresa_xml.Empresa.passpfx 
                  ),  // fiel
        new CiecDTO(
                    data[0].sp_build_empresa_xml.Empresa.rfc, 
                    data[0].sp_build_empresa_xml.Empresa.pass
                  ),
        'fiel'              
      );

      //peticion con axios
      const response = await this.http.HttpPost(SocialCreate , data[0].sp_build_empresa_xml.XML[6].value);
      
      return {
        Success: true,
        Titulo:  'Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operacion Realizada con exito.',
        Response: await response.json()
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:  'Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Update(clientId: number, id: number ):Promise<ResponseDto<any>> {
    try {
     // Obtener la conexión adecuada según el cliente.
     const connection = await this.dbConnectionService.getConnection(clientId);
     //FUNCION
     const data = await connection.query(`SELECT "scorpio_xml".sp_build_empresa_xml(${id})`);
     // construccion de XML - eliminar social
     const Body: SocialUpdateDto = new SocialUpdateDto(
       data[0].sp_build_empresa_xml.XML[0].value,
       data[0].sp_build_empresa_xml.XML[1].value,
       data[0].sp_build_empresa_xml.XML[2].value,
       data[0].sp_build_empresa_xml.Empresa.rfc,
       data[0].sp_build_empresa_xml.Empresa.pass
     );

     

     const response = await fetch(`${ data[0].sp_build_empresa_xml.XML[8].value }`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
     },
     body: JSON.stringify(Body), // Convertimos el DTO a JSON
   });
   if (!response.ok) { throw new Error( `Error en la solicitud externa: ${response.statusText}`);}
    return {
      Success:  true,
      Titulo:   'Scorpio XL - Modulo XML - Razon Social Actualizar.',
      Mensaje:  'Operacion Realizada con exito.',
      Response: await response.json()
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:  'Scorpio XL - Modulo XML - Razon Social Actualizar.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Delete( clientId: number, id: number ):Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio_xml".sp_build_empresa_xml(${id})`);
      // construccion de XML - eliminar social
      const Body: SocialDeleteDto = new SocialDeleteDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.XML[2].value,
        data[0].sp_build_empresa_xml.Empresa.rfc
      );
      const response = await fetch(`${ data[0].sp_build_empresa_xml.XML[9].value }`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
      },
      body: JSON.stringify(Body), // Convertimos el DTO a JSON
    });


    if (!response.ok) { throw new Error( `Error en la solicitud externa: ${response.statusText}`);}
    return {
      Success:  true,
      Titulo:   'Scorpio XL - Modulo XML - Razon Social Eliminar',
      Mensaje:  'Operacion Realizada con exito.',
      Response: await response.json()
    };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:  'Scorpio XL - Modulo XML - Razon Social Eliminar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


}
