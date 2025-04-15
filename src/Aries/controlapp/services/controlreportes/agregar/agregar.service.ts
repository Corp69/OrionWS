import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//Dtos
import { eccs_reportes_vistaDto } from 'src/Aries/controlapp/dtos/eccs_reportes_vista.dto';

//entidades
import { eccs_reportes_vista } from 'src/Aries/controlapp/entities/eccs_reportes_vista.entity';

@Injectable()
export class reporteDatosAgregarService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async Catalogo( clientId: number, idaplicacion: number, idmodulo: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select * from "eccs".fn_get_catalogo_reportes(${idaplicacion}, ${idmodulo})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto Servicio - Catalogo.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_catalogo_reportes,
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
        `select * from "eccs".fn_get_reportes_row(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Producto - Obtner Producto Servicio.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_get_reportes_row,
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

  public async Agregar( clientId: number, eccs_reportes_vistaDto: eccs_reportes_vistaDto  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_reportes_vista);
      let { id, ...DataDto } = eccs_reportes_vistaDto;
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

  public async Actualizar( clientId: number, eccs_reportes_vistaDto: eccs_reportes_vistaDto ): Promise<ResponseDto<any>> {
    try {

      const connection = await this.dbConnectionService.getConnection(clientId);
      const Repository = await connection.getRepository(eccs_reportes_vista);
      const row        = await Repository.preload(eccs_reportes_vistaDto);
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
      const data = await connection.query(`delete from eccs_reportes_vista where id = ${ id }`);
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