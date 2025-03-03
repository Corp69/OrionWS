import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

import { Sat_cuenta_nv1DTO } from '../dtos/sat_cuenta_nv1.dto';
import { Sat_cuenta_nv2DTO } from '../dtos/sat_cuenta_nv2.dto';

//entidades
import { sat_cuenta_nv1 } from '../entities/sat_cuenta_nv1.entity';
import { sat_cuenta_nv2 } from '../entities/sat_cuenta_nv2.entity';

@Injectable()
export class CuentasService {
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async getCuentasnv1(clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp_contabilidad".fn_cuenta_nv1()`,
      );
      return {
        Success: true,
        Titulo: 'AriesERP - Modulo Contabilidad - cuentas lv1 - lista',
        Mensaje: 'Operacion Realizada con exito.',
        Response: data[0].fn_cuenta_nv1,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'AriesERP - Modulo Contabilidad - cuentas lv1 - lista',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async getCuentas(
    clientId: number,
    id: string,
  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp_contabilidad".fn_buscar_cuenta_nv2('${id}')`,
      );
      return {
        Success: true,
        Titulo: 'AriesERP - Modulo Contabilidad - Cuentas - Obtener.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: data[0].fn_buscar_cuenta_nv2,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'AriesERP - Modulo Contabilidad - Cuentas - Obtener.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async ActualizarCuentaNV1(
    clientId: number,
    Sat_cuenta_nv1DTO: Sat_cuenta_nv1DTO,
  ): Promise<ResponseDto<any>> {
    try {
      const connection = await this.dbConnectionService.getConnection(clientId);
      const Repository = await connection.getRepository(sat_cuenta_nv1);
      const row = await Repository.preload(Sat_cuenta_nv1DTO);
      const response = await Repository.save(row);

      return {
        Success: true,
        //Id:       response.,
        Titulo:   "AriesERP - Modulo Contabilidad - cuentas lv1 - Actualizar.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó correctamente !"
      };
    } catch (error) {
      console.log( error  );
      
      throw new HttpException(
        {
          Success: false,
          Titulo: 'AriesERP - Modulo Contabilidad - cuentas lv1 - Actualizar.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async ActualizarCuentaNV2(
    clientId: number,
    Sat_cuenta_nv2DTO: Sat_cuenta_nv2DTO,
  ): Promise<ResponseDto<any>> {
    try {
      const connection = await this.dbConnectionService.getConnection(clientId);
      const Repository = await connection.getRepository(sat_cuenta_nv2);
      const row = await Repository.preload(Sat_cuenta_nv2DTO);
      const response = await Repository.save(row);

      return {
        Success: true,
        //Id:       response.,
        Titulo:   "AriesERP - Modulo Contabilidad - cuentas lv2 - Actualizar.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó correctamente !"
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'AriesERP - Modulo Contabilidad - cuentas lv2 - Actualizar.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Configuraciones(
    clientId: number,
    id: number,
  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp".arieserp_configuraciones( ${id} )`,
      );
      return {
        Success: true,
        Titulo:
          'OrionWS: AriesERP - Modulo Configuraciones - Configuraciones Activas.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: data[0].arieserp_configuraciones,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:
            'OrionWS: AriesERP - Modulo Configuraciones - Configuraciones Activas.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
}
