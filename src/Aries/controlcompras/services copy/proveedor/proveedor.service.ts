import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class ProveedorService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async getProveedor( clientId: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp_compras".fn_proveedor(1)`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo Compras - Obtener Proveedores.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].app_sucursales,
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


}
