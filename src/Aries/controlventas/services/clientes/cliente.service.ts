import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//DTOS
import { ClienteDTO } from '../../dtos/clientes/eccs_cliente.dto';
//entidades 
import { eccs_cliente } from '../../entities/clientes/eccs_cliente.entity';

@Injectable()
export class ClienteService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}


  public async getCliente( clientId: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp_ventas".fn_clientes(1)`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo Ventas - Obtener Clientes.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_clientes,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo Ventas - Obtener Clientes.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Agregar( clientId: number, ClienteDTO: ClienteDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_cliente);
      let { id, ...DataDto } = ClienteDTO;
      await repository.save(repository.create(DataDto)); 
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo Ventas - Clientes - Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se Agrego Correctamente !",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo Ventas - Clientes - Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async Actualizar( clientId: number, ClienteDTO: ClienteDTO ): Promise<ResponseDto<any>> {
    try {
      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(eccs_cliente);
      const row               = await Repository.preload(ClienteDTO);
      await Repository.save(row);
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo Ventas - Clientes - Actualziar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó corretamente !",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo Ventas - Clientes - Actualziar",
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
      await connection.query(`delete from eccs_cliente where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo Ventas - Clientes - Eliminar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Registro eliminado.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo Ventas - Clientes - Eliminar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}
