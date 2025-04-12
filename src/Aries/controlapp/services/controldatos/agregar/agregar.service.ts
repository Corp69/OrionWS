import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//Dtos
import { eccs_centro_datosDto } from 'src/Aries/controlapp/dtos/eccs_centro_datos.dto';
//entidades
import { eccs_centro_datos } from 'src/Aries/controlapp/entities/eccs_centro_datos.entity';


@Injectable()
export class centroDatosAgregarService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async Catalogo( clientId: number, idaplicacion: number, idmodulo: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select * from "eccs".fn_get_catalogo_centro_datos(${idaplicacion}, ${idmodulo})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto Servicio - Catalogo.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_catalogo_centro_datos,
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


  public async getDatos( clientId: number, id: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select * from "eccs".fn_get_centro_datos_row(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto - Obtner Producto Servicio.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_centro_datos_row,
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

  public async Agregar( clientId: number, eccs_centro_datosDto: eccs_centro_datosDto  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_centro_datos);
      let { id, ...DataDto } = eccs_centro_datosDto;
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

  public async Actualizar( clientId: number, eccs_centro_datosDto: eccs_centro_datosDto ): Promise<ResponseDto<any>> {
    try {

      const connection = await this.dbConnectionService.getConnection(clientId);
      const Repository = await connection.getRepository(eccs_centro_datos);
      const row        = await Repository.preload(eccs_centro_datosDto);
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
      const data = await connection.query(`delete from eccs_centro_datos where id = ${ id }`);
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