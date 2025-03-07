import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//Dtos
import { SucursalDTO } from '../../dtos/arieserp_sucursal.dto';
//entidades
import { arieserp_sucursal } from '../../entities/arieserp_sucursal.entity';


@Injectable()
export class SucursalesService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async getSucursal( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp".fn_get_sucursal(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Sucursales - Obtener.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_sucursal,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Sucursales - Obtener.",
          Mensaje:  "Operación no se realizó",
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
        `SELECT "arieserp".fn_get_catalogo_sucursales(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Sucursales - Catalogo.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_catalogo_sucursales,
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

  public async Agregar( clientId: number, SucursalDTO: SucursalDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(arieserp_sucursal);
      let { id, ...DataDto } = SucursalDTO;
      let response  = await repository.save(repository.create(DataDto)); 
      
      return {
        Success:  true,
        Id:       response.id,
        Titulo:   "AriesERP - Modulo App - Sucursales - Agregar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se agrego correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Sucursales - Agregar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Actualizar( clientId: number, SucursalDTO: SucursalDTO ): Promise<ResponseDto<any>> {
    try {

      const connection = await this.dbConnectionService.getConnection(clientId);
      const Repository = await connection.getRepository(arieserp_sucursal);
      const row        = await Repository.preload(SucursalDTO);
      const response   = await Repository.save(row);

      return {
        Success:  true,
        Id:       response.id,
        Titulo:   "AriesERP - Modulo App - Sucursales - Actualizar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Sucursales - Actualizar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async Eliminar( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`delete from arieserp_sucursal where id = ${ id }`);
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