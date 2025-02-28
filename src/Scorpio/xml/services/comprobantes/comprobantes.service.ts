import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';

//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//Dtos
import { SolicitaDto } from '../../dtos/comprobantes/solicita.dto';
//entidad
import { xml_comprobante_solicita_metadata } from '../../entities/comprobantes/xml_comprobante_solicita_metadata.entity';

@Injectable()
export class ComprobantesService {
  constructor(
      private readonly dbConnectionService: DatabaseConnectionService,
    ) {}

    

  public async XML_Comprobante(clientId: number,  id: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio_empresas".fn_empresas_peticiones_xml(${id})`);
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Comprobante',
        Mensaje: 'Operación Realizada con exito.',
        Response: data[0].fn_empresas_peticiones_xml,
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
 
  public async XML_Comprobante_Solicitar(clientId: number,  id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);

      //Funcion
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_generar_solicitud(${id});`);
      //construccion de XML - generar solicitud
      const Solicita: SolicitaDto = new SolicitaDto(
              
              data[0].sp_build_xml_generar_solicitud.XML[0].valor,
              data[0].sp_build_xml_generar_solicitud.XML[1].valor,
              data[0].sp_build_xml_generar_solicitud.XML[2].valor,
              data[0].sp_build_xml_generar_solicitud.Empresa.rfc,
              data[0].sp_build_xml_generar_solicitud.Empresa.tipopeticion,
              data[0].sp_build_xml_generar_solicitud.Empresa.fechainicio,
              data[0].sp_build_xml_generar_solicitud.Empresa.fechafin,
              data[0].sp_build_xml_generar_solicitud.Empresa.montominimo,
              data[0].sp_build_xml_generar_solicitud.Empresa.montomaximo      
      );
      //peticion con fetch
      const response = await fetch(`${ data[0].sp_build_xml_generar_solicitud.XML[3].valor }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify(Solicita),
      });

      console.log( "socialcreate",Solicita );
      console.log( await response.json() );
      

      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      //Retornamos la respuesta formateada si la solicitud fue exitosa
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
  
  public async XML_Comprobante_Verificar(clientId: number,  id: number): Promise<ResponseDto<any>> {
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
