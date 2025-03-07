import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//dtos
import { EmpleadoDTO } from '../../dtos/empledo/eccs_empleado.dto';
//Entidades
import { eccs_empleado } from '../../entities/empledo/eccs_empleado.entity';

@Injectable()
export class EmpleadoService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async obtenerEmpleado( clientId: number, id: number  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp_rh".fn_get_empleado(${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Obtener Empleados.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_get_empleado,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Obtener Empleados.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Catalogo( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select  "arieserp_rh".fn_get_catalogo_empleados(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Sucursales - Catalogo.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_catalogo_empleados,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Sucursales - Catalogo.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async agregar( clientId: number, EmpleadoDTO: EmpleadoDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_empleado);
      let { id, ...DataDto } = EmpleadoDTO;
      let response = await repository.save(repository.create(DataDto)); 
      return {
        Success:  true,
        Id:       response.id,
        Titulo:   'AriesERP - Modulo App - Sucursales - Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se agrego correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Sucursales - Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async actualizar( clientId: number, EmpleadoDTO: EmpleadoDTO ): Promise<ResponseDto<any>> {
    try {

      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(eccs_empleado);
      const row               = await Repository.preload(EmpleadoDTO);
      const response          = await Repository.save(row);

      return {
        Success:  true,
        Id:       response.id,
        Titulo:   'AriesERP - Modulo App - Sucursales - Actualizar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se actualizó con éxito!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Sucursales - Actualizar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  

  public async eliminar( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`delete from eccs_empleado where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Empresas Elimiar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Registro eliminado.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Empresas Elimiar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
}
