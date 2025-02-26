import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//dtos
import { ProveedorDTO } from '../../dtos/proveedor/eccs_proveedor.dto';
//entidades
import { eccs_proveedor } from '../../entities/proveedor/eccs_proveedor.entity';

@Injectable()
export class ProveedorService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async getProveedor( clientId: number , id:     number): Promise<ResponseDto<any>> {

    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select "arieserp_compras".fn_get_proveedores(${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo Compras - Obtener Proveedores.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_get_proveedores,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo Compras - Obtener Proveedores.',
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
        `select "arieserp_compras".fn_proveedores(${id})`,
      );
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo App - Sucursales - Catalogo.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: data[0].fn_proveedores,
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

  public async Agregar( clientId: number, ProveedorDTO: ProveedorDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_proveedor);
      let { id, ...DataDTO } = ProveedorDTO;
      let response  = await repository.save(repository.create(DataDTO)); 
      return {
        Success:  true,
        Id:       response.id,
        Titulo:   'AriesERP - Modulo Compras - Proveedores - Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se agrego correctamente !",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo Compras - Proveedores - Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async Actualizar( clientId: number, ProveedorDTO: ProveedorDTO ): Promise<ResponseDto<any>> {
    try {

      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(eccs_proveedor);
      const row               = await Repository.preload(ProveedorDTO);
      const response          = await Repository.save(row);

      return {
        Success:  true,
        Id:       response.id,
        Titulo:   "AriesERP - Modulo Compras - Proveedores - Actualizar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se actualizo correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo Compras - Proveedores - Actualizar',
          Mensaje:  'Operacion Realizada con exito.',
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
      await connection.query(`delete from eccs_proveedor where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo Compras - Proveedores - Elimiar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Registro eliminado.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo Compras - Proveedores - Elimiar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}
