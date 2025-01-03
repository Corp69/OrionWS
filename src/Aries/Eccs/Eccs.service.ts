import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DataSource } from 'typeorm';
import { EccsDTO } from './dto/Eccs.dto';
import { EccsCodigoDTO } from './dto/EccsCodigo.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Injectable()
export class EccsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly dbConnectionService: DatabaseConnectionService
  ) { }

  public async getVersion(idUser: number): Promise<ResponseDto<any>> {
    try {
      const data = await this.dataSource.query(
        `SELECT "eccs".orion_update_version( ${idUser})`,
      );
      return {
        Success: true,
        Titulo: 'ECCS: AriesERP - Version.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: data[0].orion_update_version,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'ECCS: AriesERP - Version.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async getUpdate(EccsCodigoDTO: EccsCodigoDTO, idUser: number ): Promise<ResponseDto<any>> {
    try {
      const dataCodigo = await this.dataSource.query(`select sum( id + 0 ) id  from eccs_empresas_actualizacion where codigo = '${EccsCodigoDTO._codigo}' and id_eccs_empresas = ${idUser} and id_eccs_status = 9`);
      if (dataCodigo[0].id == null) {
        return {
          Success: true,
          Titulo: 'ECCS: AriesERP - Update.',
          Mensaje: 'Operación Realizada con éxito.',
          Response: 'Verificar el codigo de seguridad.',
        }
      }
      const data = await this.dataSource.query(
        `SELECT "eccs".Orion_excute_query( ${idUser},'${EccsCodigoDTO._codigo}')`,
      );
      // Si query es un array, lo procesamos como un conjunto de queries
      const queries = Array.isArray(data[0].orion_excute_query.query)
        ? data[0].orion_excute_query.query
        : [data[0].orion_excute_query.query];

      // Crear un objeto para almacenar el estado de la actividad
      const actividadStatus: { [actividad: string]: boolean } = {};
      // Estructura para almacenar las actividades y sus estatus
      let act = {
        actividad: [], // No inicializar con objetos vacíos
        actividadStatus: [], // Tampoco inicializar con objetos vacíos
      };
      // Iterar sobre cada query
      for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        try {
          // Comprobar si el id ya fue procesado
          // Ejecutar el query original
          await this.dataSource.query(query.query);
          // Ejecutar el UPDATE solo si el id no fue procesado antes
          await this.dataSource.query(
            `UPDATE eccs_empresas_actualizacion SET id_eccs_status = 10, activa = false WHERE eccs_empresas_actualizacion.id IN (${query.id})`,
          );
          // Almacenar la actividad como exitosa
          actividadStatus[query.actividad] = true;
          act.actividad.push(
            `${i + 1} (${query.actividad}) ejecutado exitosamente`,
          );
        } catch (err) {
          // Si hubo un error, almacenar la actividad como fallida
          actividadStatus[query.actividad] = false;
          act.actividad.push(
            `Error al ejecutar: ${i + 1} (${query.actividad}): ${err.message || err}`,
          );
        }
      }
      // Almacenar el estado final de todas las actividades
      act.actividadStatus.push(actividadStatus);
      return queries.length == 0
        ? {
          Success: true,
          Titulo: 'ECCS: AriesERP - Update.',
          Mensaje: 'Operación Realizada con éxito.',
          Response: 'No hay Update Pendientes.',
        }
        : {
          Success: true,
          Titulo: 'ECCS: AriesERP - Update.',
          Mensaje: 'Operación Realizada con éxito.',
          Response: act,
        };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'ECCS: AriesERP - Update.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async test(idUser: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      let connection = await this.dbConnectionService.getConnection(idUser);
      // Ejecutar la consulta en la base de datos seleccionada.
      const data = await connection.query(
        `INSERT INTO testdatasource (descripcion) VALUES ( 'xxxx')`
      );
      return {
        Success: true,
        Titulo: "OrionWS webservice - Modulo - Datasource.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: "OrionWS webservice - Modulo - Datasource.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }





}
