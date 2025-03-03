import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';

// datasource
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//dtos
import { SolicitaDto } from '../../dtos/solicitudes/solicitudes.dto';
// entidad
import { xml_comprobante_solicita_metada } from '../../entities/solicitudes/xml_comprobante_solicita_metada.entity';

@Injectable()
export class SolicitudService {

  constructor(private readonly dbConnectionService: DatabaseConnectionService) { }

  public async getSolicitud(clientId: number,  id: number): Promise<any> {
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

  public async getMulticom(clientId: number,  id: number): Promise<any> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio_empresas".fn_empresas_peticiones_multi_xml(${id})`);
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Comprobante',
        Mensaje: 'Operación Realizada con exito.',
        Response: data[0].fn_empresas_peticiones_multi_xml,
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

  public async Agregar(clientId: number,  id: number, SolicitaDto: SolicitaDto ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(xml_comprobante_solicita_metada);
      let { id, ...solicitudData } = SolicitaDto;
      let savedEntity = await repository.save(repository.create(solicitudData)); 
     
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Solicita',
        Mensaje: 'Operación Realizada con exito.',
        Response: 'Se almacenó correctamente',
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


}
