import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { DomicilioProveedorDTO } from '../../dtos/proveedordomicilio/eccs_proveedor_domicilio.dto';
import { eccs_proveedor_domicilio } from '../../entities/proveedor domicilio/eccs_proveedor_domicilio.entity';

@Injectable()
export class ProveedorDomicilioService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

   public async obtenerdomicilio( clientId: number , idproveedor: number, idestatus: number ): Promise<ResponseDto<any>> {
  
      try {
        // Obtener la conexión adecuada según el cliente.
        const connection = await this.dbConnectionService.getConnection(clientId);
        //FUNCION
        const data = await connection.query(
          `select "arieserp_compras".fn_get_catalogo_proveedores_domicilio(${idproveedor}, ${idestatus})`,
        );
        return {
          Success:  true,
          Titulo:   'AriesERP - Modulo Compras - Obtener Proveedores.',
          Mensaje:  'Operacion Realizada con exito.',
          Response: data[0].fn_get_catalogo_proveedores_domicilio,
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
  
    public async agregardomicilio( clientId: number, DomicilioProveedorDTO: DomicilioProveedorDTO  ): Promise<ResponseDto<any>> {
      try {
        let connection = await this.dbConnectionService.getConnection(clientId);
        let repository = connection.getRepository(eccs_proveedor_domicilio);
        let { id, ...DataDTO } = DomicilioProveedorDTO;
        let savedEntity = await repository.save(repository.create(DataDTO)); 
        return {
          Success:  true,
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
    
    public async actualizardomicilio( clientId: number, DomicilioProveedorDTO: DomicilioProveedorDTO ): Promise<ResponseDto<any>> {
      try {
  
        const connection        = await this.dbConnectionService.getConnection(clientId);
        const Repository        = await connection.getRepository(eccs_proveedor_domicilio);
        const row               = await Repository.preload(DomicilioProveedorDTO);
        await Repository.save(row);
  
        return {
          Success:  true,
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
      
    public async eliminardomicilio( clientId: number, id: number ): Promise<ResponseDto<any>> {
      try {
        // Obtener la conexión adecuada según el cliente.
        const connection = await this.dbConnectionService.getConnection(clientId);
        //FUNCION
        await connection.query(`delete from eccs_proveedor_domicilio where id = ${ id }`);
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
