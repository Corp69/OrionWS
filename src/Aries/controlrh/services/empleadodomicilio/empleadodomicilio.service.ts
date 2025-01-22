import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class EmpleadoDomicilioService {
  
  constructor(  private readonly dbConnectionService: DatabaseConnectionService ) {}

  public async getEmpresa( clientId: number, _id_estatus: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select "arieserp_rh".fn_empleados_domicilio(${ _id_estatus })`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Empleados - Domicilios.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_empleados_domicilio,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Empleados - Domicilios.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}
