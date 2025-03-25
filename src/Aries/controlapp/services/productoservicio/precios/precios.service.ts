import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//Dtos
import { Eccs_producto_servicio_preciosDto } from 'src/Aries/controlapp/dtos/eccs_producto_servicio_precios.dto';
//entidades
import { eccs_producto_servicio_precios } from 'src/Aries/controlapp/entities/eccs_producto_servicio_precios.entity';



@Injectable()
export class ProductoservicioPrecioService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async Catalogo( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select "arieserp".fn_get_catalogo_producto_servicio_precios(${id}, ${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto Servicio - Precios - Catalogo.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_catalogo_producto_servicio_precios,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Producto Servicio - Precios - Catalogo.",
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
        `select "arieserp".fn_get_producto_servicio_precio(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto - Obtner - precio - Producto Servicio.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_producto_servicio_precio,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Producto - Obtner - precio - Producto Servicio.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Agregar( clientId: number, Eccs_producto_servicio_preciosDto: Eccs_producto_servicio_preciosDto  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_producto_servicio_precios);
      let { id, ...DataDto } = Eccs_producto_servicio_preciosDto;
      let response  = await repository.save(repository.create(DataDto)); 
      
      return {
        Success:  true,
        Id:       response.id,
        Titulo:   "AriesERP - Modulo App - producto servicio - precio - Agregar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se agrego correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - producto servicio - precio - Agregar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Actualizar( clientId: number, Eccs_producto_servicio_preciosDto: Eccs_producto_servicio_preciosDto ): Promise<ResponseDto<any>> {
    try {

      const connection = await this.dbConnectionService.getConnection(clientId);
      const Repository = await connection.getRepository(eccs_producto_servicio_precios);
      const row        = await Repository.preload(Eccs_producto_servicio_preciosDto);
      const response   = await Repository.save(row);

      return {
        Success:  true,
        Id:       response.id,
        Titulo:   "AriesERP - Modulo App - Producto Servicio - precio - Actualizar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo App - Producto Servicio - precio - Actualizar",
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
      const data = await connection.query(`delete from eccs_producto_servicio_precios where id = ${ id }`);
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