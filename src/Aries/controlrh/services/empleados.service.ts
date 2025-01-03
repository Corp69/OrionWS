import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Injectable()
export class EmpleadosService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async Configuraciones( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection( clientId );
      //FUNCION
      const data =  await connection.query(`SELECT "arieserp".arieserp_configuraciones( ${id} )`);
      return {
        Success: true,
        Titulo: "OrionWS: AriesERP - Modulo Configuraciones - Configuraciones Activas.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].arieserp_configuraciones,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:  "OrionWS: AriesERP - Modulo Configuraciones - Configuraciones Activas.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK
      );
    }
  }


}
