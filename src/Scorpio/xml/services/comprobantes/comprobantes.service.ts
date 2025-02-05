import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

import { 
    ComprobanteDto,
    SolicitaDto,
    VerificaDto
 } from '../../dtos/comprobantes';

@Injectable()
export class ComprobantesService {
  constructor(
      private readonly dbConnectionService: DatabaseConnectionService,
    ) {}

    

  public async XML_Comprobante(ComprobanteDto: ComprobanteDto): Promise<any> {
    try {
      const response = await fetch(`${process.env.XML_Comprobante}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Comprobante',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json(),
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Comprobante',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
 
  public async XML_Comprobante_Solicitar(clientId: number, SolicitaDto2: SolicitaDto): Promise<any> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //Funcion
      const data = await connection.query(`SELECT * from "scorpio_xml".sp_build_xml_generar_solicitud()`);
      //construccion de XML - generar solicitud
      const Solicita: SolicitaDto = new SolicitaDto(
              
              data[0].sp_build_xml_generar_solicitud._xml[0].value,
              data[0].sp_build_xml_generar_solicitud._xml[1].value,
              data[0].sp_build_xml_generar_solicitud._xml[2].value,
              data[0].sp_build_xml_generar_solicitud._xml[2].value,
              data[0].sp_build_xml_generar_solicitud._xml[2].value,
              data[0].sp_build_xml_generar_solicitud._xml[2].value,
              data[0].sp_build_xml_generar_solicitud._xml[2].value,
              data[0].sp_build_xml_generar_solicitud._xml[2].value,
              data[0].sp_build_xml_generar_solicitud._xml[2].value
      );
      //peticion con fetch
      const response = await fetch(`${ data[0].sp_build_xml_generar_solicitud._xml[3].value }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify(Solicita),
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Solicita',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json(),
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Solicita',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  public async XML_Comprobante_Verificar(VerificaDto: VerificaDto): Promise<any> {
    try {
      const response = await fetch(`${process.env.XML_Comprobante_Verificar}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Verifica',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json(),
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Verifica',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}
