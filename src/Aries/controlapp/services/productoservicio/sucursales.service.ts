import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//Dtos
import { Eccs_producto_servicioDto } from '../../dtos/eccs_producto_servicio.dto';
//entidades
import { eccs_producto_servicio } from '../../entities/eccs_producto_servicio.entity';


@Injectable()
export class ProductoservicioService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async Catalogo( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp".fn_get_catalogo_producto_servicio(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto Servicio - Catalogo.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_catalogo_producto_servicio,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Producto Servicio - Catalogo.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


  public async getProducto( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp".fn_get_producto_servicio(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto - Obtner Producto Servicio.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_producto_servicio,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Producto - Obtner Producto Servicio.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Agregar( clientId: number, Eccs_producto_servicioDto: Eccs_producto_servicioDto  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_producto_servicio);
      let { id, ...DataDto } = Eccs_producto_servicioDto;
      let response  = await repository.save(repository.create(DataDto)); 
      
      return {
        Success:  true,
        Id:       response.id,
        Titulo:   "AriesERP - Modulo App - producto servicio  - Agregar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se agrego correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - producto servicio  - Agregar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Actualizar( clientId: number, Eccs_producto_servicioDto: Eccs_producto_servicioDto ): Promise<ResponseDto<any>> {
    try {

      const connection = await this.dbConnectionService.getConnection(clientId);
      const Repository = await connection.getRepository(eccs_producto_servicio);
      const row        = await Repository.preload(Eccs_producto_servicioDto);
      const response   = await Repository.save(row);

      return {
        Success:  true,
        Id:       response.id,
        Titulo:   "AriesERP - Modulo App - Producto Servicio - Actualizar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Producto Servicio - Actualizar",
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
      const data = await connection.query(`delete from eccs_producto_servicio where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Producto Elimiar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Registro eliminado.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Producto Elimiar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}