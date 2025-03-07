import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';

//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//Dtos
import { SolicitaDto } from '../../dtos/comprobantes/solicita.dto';
import { VerificaDto } from '../../dtos/comprobantes';

//entidad
import { xml_comprobante_solicita_metada } from '../../../controlapp/entities/solicitudes/xml_comprobante_solicita_metada.entity';
import { clientHttp } from '@shared/client/clienthttp';

@Injectable()
export class ComprobantesService {
  constructor(
      private readonly dbConnectionService: DatabaseConnectionService,
      private readonly http: clientHttp
    ) {}

    

  //trae la lista de las peticiones 
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
 
  //crea la peticion y almacena en base de datos
  public async XML_Comprobante_Solicitar(clientId: number,  id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      
      // entity
      const repository = connection.getRepository(xml_comprobante_solicita_metada);
      
      //Funcion
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_generar_solicitud(${id});`);
      //construccion de XML - generar solicitud
      const Solicita: SolicitaDto = new SolicitaDto(
              
              data[0].sp_build_xml_generar_solicitud.XML[0].valor,
              data[0].sp_build_xml_generar_solicitud.XML[3].valor,
              data[0].sp_build_xml_generar_solicitud.XML[1].valor,
              [data[0].sp_build_xml_generar_solicitud.Empresa.rfc],
              data[0].sp_build_xml_generar_solicitud.Empresa.tipopeticion,
              data[0].sp_build_xml_generar_solicitud.Empresa.fechainicio,
              data[0].sp_build_xml_generar_solicitud.Empresa.fechafin,
              data[0].sp_build_xml_generar_solicitud.Empresa.montominimo,
              data[0].sp_build_xml_generar_solicitud.Empresa.montomaximo      
      );
      //peticion con axios
      const response = await this.http.httpPost(data[0].sp_build_xml_generar_solicitud.XML[2].valor, Solicita); 
    
      //actualizo el estatus de la peticion.
      const resp = 
      await repository.update(id, {
        id_estatus: 7,
        id_xml_peticion: response.solicitud
      });

      console.log(resp)
     

      //Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Solicita',
        Mensaje: 'Operación Realizada con exito.',
        Response: response,
      };
    } catch (error) {
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
  // verifica las peticiones en curso
  public async XML_Comprobante_Verificar(clientId: number,  id: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);

      //Funcion
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_verifica(${id});`);
      // construccion de XML - create social
            const Body: VerificaDto = new VerificaDto(
              data[0].sp_build_xml_verifica.XML[0].valor,
              data[0].sp_build_xml_verifica.XML[1].valor,
              data[0].sp_build_xml_verifica.XML[7].valor,
              data[0].sp_build_xml_verifica.solicitud.valor
            );

      //peticion con axios
      const response = await this.http.httpPost(data[0].sp_build_xml_verifica.XML[4].valor, Body);

      console.log(response)

      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Verifica',
        Mensaje: 'Operación Realizada con exito.',
        Response: response,
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
