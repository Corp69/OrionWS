import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class ControlappService {
constructor(
  private readonly dbConnectionService: DatabaseConnectionService,
) {}


  public async getList( clientId: number, tabla: string ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select id, descripcion from ${ tabla } order by id`,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async getListEmpresas( clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        ` select
              id,
              nombrecomercial as descripcion
          from arieserp_empresa
          where id_estatus in (1,5)
              and activa is true
          order by id
        `,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado - Empresa.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado - Empresa.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async getlstSucursalD( clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        ` select
              id,
              descripcion
          from arieserp_sucursal
          where id_estatus in (1,5)
              and activo is true
          order by id
        `,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado - sucursal.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado - sucursal.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


  public async getlstDepartamento( clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        ` select
            id,
            descripcion
          from rh_departamento
          where id_estatus in (1,5)
              and activo is true
          order by id
        `,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo RH - listado - Departamentos.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo RH - listado - Departamentos.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


  // public async getlistDomicilios( clientId: number, id: number ): Promise<ResponseDto<any>> {
  //   try {
  //     // Obtener la conexión adecuada según el cliente.
  //     const connection = await this.dbConnectionService.getConnection(clientId);
  //     //FUNCION
  //     const data = await connection.query(
  //       `select    eccs_empleado_domicilio.id,    coalesce(eccs_empleado_domicilio.cp ,'-') || ' ' || coalesce(eccs_empleado_domicilio.calle,'') ||' ' ||  coalesce(eccs_empleado_domicilio.num_ext,'-') || ' ' || coalesce(eccs_empleado_domicilio.num_int,'-') || ',' ||  pais.nombre as  descripcion 
  //       from  
  //       eccs_empleado_domicilio    
  //         inner join pais on eccs_empleado_domicilio.id_pais = pais.id        
  //           and pais.id = 146 
  //       where eccs_empleado_domicilio.id_eccs_empleado = ${id}    
  //         and eccs_empleado_domicilio.id_estatus = 1    
  //         and eccs_empleado_domicilio.id_estatus = 1
  //       order by eccs_empleado_domicilio.cp`,
 
  //     );
  //     return {
  //       Success:  true,
  //       Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
  //       Mensaje:  'Operacion Realizada con exito.',
  //       Response: data,
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         Success:  false,
  //         Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
  //         Mensaje:  'Operación no se realizó',
  //         Response: error.message || error,
  //       },
  //       HttpStatus.OK,
  //     );
  //   }
  // }
}
