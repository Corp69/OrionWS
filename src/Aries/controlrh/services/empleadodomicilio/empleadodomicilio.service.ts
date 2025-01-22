import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class EmpleadoDomicilioService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async getEmpleadoDomicilio( EmpleadoDomicilioID: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(EmpleadoDomicilioID);
      //FUNCION
      const data = await connection.query(
        `select "arieserp_rh".fn_empleados_domicilio()`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Obtener Empleado Domicilio.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].arieserp_rh,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Obtener Empleado Domicilio.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}
