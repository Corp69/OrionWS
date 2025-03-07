import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { DomicilioClienteDTO } from '../../dtos/clientesdomicilio/eccs_cliente_domicilio.dto';
import { eccs_cliente_domicilio } from '../../entities/clientesdomicilio/eccs_cliente_domicilio.entity';

@Injectable()
export class ClienteDomicilioService {
  
  constructor(  private readonly dbConnectionService: DatabaseConnectionService ) {}

  public async obtenerdomicilio( clientId: number, id:     number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select "arieserp_ventas".fn_get_catalogo_clientes_domiclio(${id}, ${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo Ventas - Obtener Clientes.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_get_catalogo_clientes_domiclio,
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

  public async agregardomicilio( clientId: number, DomicilioClienteDTO: DomicilioClienteDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_cliente_domicilio);
      let { id, ...DataDto } = DomicilioClienteDTO;
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
  
  public async actualizardomicilio( clientId: number, DomicilioClienteDTO: DomicilioClienteDTO ): Promise<ResponseDto<any>> {
    try {
      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(eccs_cliente_domicilio);
      const row               = await Repository.preload(DomicilioClienteDTO);
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
  
  public async eliminardomicilio( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      await connection.query(`delete from eccs_cliente_domicilio where id = ${ id }`);
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
