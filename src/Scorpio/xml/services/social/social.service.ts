import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//http cliente generico
import { clientHttp } from '@shared/client/clienthttp';
import { ResponseDto } from '@shared/dtos/Response.dto';
//dtos
import { CiecDTO, FielDTO } from '../../dtos/social/socialcreate.dto';
import {
  SocialCreateDto,
  SocialDeleteDto,
  SocialLstDto,
  SocialUpdateDto,
} from '../../dtos/social';
import { razonSocialDTO } from '../../dtos/social/socialupdate.dto';
import { ProdigiaErrorService } from '@shared/errors/ProdigiaErrorService';

@Injectable()
export class SocialService {
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
    private readonly clientHttp: clientHttp,
    private readonly errorService: ProdigiaErrorService
  ) {}

  public async XML_Social_Lst(
    clientId: number,
    id: number,
  ): Promise<ResponseDto<any>> {

    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "scorpio_xml".sp_build_empresa_xml(${id})`,
      );
      
      // construccion de XML - create social
      const Body: SocialLstDto = new SocialLstDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[12].value,
        data[0].sp_build_empresa_xml.XML[1].value,
      );
      
      //peticion con Axios
      const response = await this.clientHttp.httpPost(
        `${data[0].sp_build_empresa_xml.XML[6].value}`,
        JSON.stringify(Body),
      );

      return {
        Success: true,
        Titulo: 'Scorpio XL - Modulo XML - Razon Social Lista',
        Mensaje: 'Operacion Realizada con exito.',
        Response: response,
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

  public async XML_Social_Create(
    clientId: number,
    id: number,
  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "scorpio_xml".sp_build_empresa_xml(${id})`,
      );
      // construccion de XML - create social
      const SocialCreate: SocialCreateDto = new SocialCreateDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[12].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.Empresa.nombrecomercial,
        data[0].sp_build_empresa_xml.Empresa.fechainiciosync,
        data[0].sp_build_empresa_xml.Empresa.maxcomprobantesmensual,
        data[0].sp_build_empresa_xml.Empresa.celular,

        new FielDTO(
          data[0].sp_build_empresa_xml.Empresa.pfx,
          data[0].sp_build_empresa_xml.Empresa.passpfx,
        ), // fiel
        new CiecDTO(
          data[0].sp_build_empresa_xml.Empresa.rfc,
          data[0].sp_build_empresa_xml.Empresa.pass,
        ),
        'fiel',
      );
      //peticion con Axios
      const response = await this.clientHttp.httpPost(
        `${data[0].sp_build_empresa_xml.XML[5].value}`,
        JSON.stringify(SocialCreate),
      );

      if(response.codigo || response.codigo !== 0){
        const mensajeError = this.errorService.getErrorMessage(response.codigo)
        return {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: response.mensaje,
        };
      }

      return {
        Success: true,
        Titulo: 'Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operacion Realizada con exito.',
        Response: response,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Update(
    clientId: number,
    id: number,
  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "scorpio_xml".sp_build_empresa_xml(${id})`,
      );
      // construccion de XML - eliminar social
      const Body: SocialUpdateDto = new SocialUpdateDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[12].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.Empresa.rfc,

        new razonSocialDTO(
          data[0].sp_build_empresa_xml.Empresa.pfx,
          data[0].sp_build_empresa_xml.Empresa.passpfx,
          data[0].sp_build_empresa_xml.Empresa.certificado,
        )
      );

      //peticion con Axios
      const response = await this.clientHttp.httpPost(
        `${data[0].sp_build_empresa_xml.XML[13].value}`,
        JSON.stringify(Body),
      );

      return {
        Success: true,
        Titulo: 'Scorpio XL - Modulo XML - Razon Social Actualizar.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: response,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Razon Social Actualizar.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Delete(
    clientId: number,
    id: number,
  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "scorpio_xml".sp_build_empresa_xml(${id})`,
      );
      // construccion de XML - eliminar social
      const Body: SocialDeleteDto = new SocialDeleteDto(
        data[0].sp_build_empresa_xml.XML[0].value,
        data[0].sp_build_empresa_xml.XML[12].value,
        data[0].sp_build_empresa_xml.XML[1].value,
        data[0].sp_build_empresa_xml.Empresa.rfc,
      );
      //peticion con Axios
      const response = await this.clientHttp.httpPost(
        `${data[0].sp_build_empresa_xml.XML[7].value}`,
        JSON.stringify(Body),
      );

      if(response.codigo || response.codigo !== 0){
        const mensajeError = this.errorService.getErrorMessage(response.codigo)
        return {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: response.mensaje,
        };
      }

      return {
        Success: true,
        Titulo: 'Scorpio XL - Modulo XML - Razon Social Eliminar',
        Mensaje: 'Operacion Realizada con exito.',
        Response: response,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL - Modulo XML - Razon Social Eliminar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
}
