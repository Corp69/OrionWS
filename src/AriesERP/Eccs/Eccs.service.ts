import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DataSource } from 'typeorm';
import { EccsDTO } from './dto/Eccs.dto';
import { EccsCodigoDTO } from './dto/EccsCodigo.dto';

@Injectable()
export class EccsService {
  constructor(private readonly dataSource: DataSource) {}

  public async getActualizaciones(EccsDTO: EccsDTO): Promise<ResponseDto<any>> {
    try {
      const data = await this.dataSource.query(
        `SELECT "eccs".Orion_Update_version( ${EccsDTO._idempresa})`,
      );
      return {
        Success: true,
        Titulo: 'ECCS: AriesERP - Actualizaciones.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: data[0].Orion_update_version,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'ECCS: AriesERP - Actualizaciones.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async getEjecutarQuery( EccsCodigoDTO: EccsCodigoDTO ): Promise<ResponseDto<any>> {
    try {
      const dataCodigo = await this.dataSource.query( `select sum( id + 0 ) id  from eccs_empresas_actualizacion where codigo = '${EccsCodigoDTO._codigo}' and id_eccs_empresas = ${EccsCodigoDTO._idempresa} and id_eccs_status = 9`);
      if ( dataCodigo[0].id == null ) {
        return {
          Success: true,
          Titulo: 'ECCS: AriesERP - Actualizaciones.',
          Mensaje: 'Operación Realizada con éxito.',
          Response: 'Verificar el codigo de seguridad.',
        }
      }
      const data = await this.dataSource.query(
        `SELECT "eccs".Orion_excute_query( ${EccsCodigoDTO._idempresa},'${EccsCodigoDTO._codigo}')`,
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
              Titulo: 'ECCS: AriesERP - Actualizaciones.',
              Mensaje: 'Operación Realizada con éxito.',
              Response: 'No hay Actualizaciones Pendientes.',
            }
          : {
              Success: true,
              Titulo: 'ECCS: AriesERP - Actualizaciones.',
              Mensaje: 'Operación Realizada con éxito.',
              Response: act,
            };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'ECCS: AriesERP - Actualizaciones.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


}
