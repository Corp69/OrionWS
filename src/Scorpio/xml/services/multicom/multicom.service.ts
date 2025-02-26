import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

//datasource
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { ResponseDto } from '@shared/dtos/Response.dto';
//entidad
import { xml_comprobante_solicita_metada } from '../../../controlapp/entities/solicitudes/xml_comprobante_solicita_metada.entity';

import { 
    MultiSolicitaDto,
    MultiVerificaDto
 } from '../../dtos/multicomp';
import { httpClienteService } from '@shared/http/httpClienteService';



@Injectable()
export class MulticomService {

  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
    private readonly http: httpClienteService
  ) {}
  //Solicitar multicomprobantes
  public async XML_MultComprobante_Solicitar(clientId: number,  id: number): Promise<ResponseDto<any>> {
    try {
      // 
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      
      // entity
      const repository = connection.getRepository(xml_comprobante_solicita_metada);
      
      //Funcion
      const data = await connection.query(`select "scorpio_xml".sp_build_xml_generar_solicitud_multicomprobante(${id});`);
      //construccion de XML - generar solicitud
      const Solicita: MultiSolicitaDto = new MultiSolicitaDto(
              
              data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[0].valor,
              data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[1].valor,
              data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[2].valor,
              data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.fechainicio,
              data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.fechafin,
              [data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.rfc],
              data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.tipopeticion,
              data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.tipo,
              data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.montominimo,
              data[0].sp_build_xml_generar_solicitud_multicomprobante.Empresa.montomaximo      
      );
      //peticion con axios
      const response = await this.http.HttpPost(Solicita , data[0].sp_build_xml_generar_solicitud_multicomprobante.XML[4].valor);


      //actualizo el estatus de la peticion.
      await repository.update(id, {
        id_estatus: 7,
        id_xml_peticion: response.solicitud,
      });
      
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Comprobante',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response,
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

  //Verificar solicitud de multicomprobantes
  public async XML_MultComprobante_Verificar( clientId: number,  id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
            const connection = await this.dbConnectionService.getConnection(clientId);
      
            //Funcion
            const data = await connection.query(`select "scorpio_xml".sp_build_xml_verifica();`);
            // construccion de XML - create social
                  const Body: MultiVerificaDto = new MultiVerificaDto(
                    data[0].sp_build_xml_verifica.XML[0].value,
                    data[0].sp_build_xml_verifica.XML[1].value,
                    data[0].sp_build_xml_verifica.XML[2].value,
                    data[0].sp_build_xml_verifica.XML[2].value
                  );
      
            //peticion con axios
            const response = await this.http.HttpPost(Body , data[0].sp_build_xml_verifica.XML[7].valor);
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Comprobante',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response,
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
}
