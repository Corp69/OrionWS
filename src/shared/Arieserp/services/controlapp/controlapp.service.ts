import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class ControlappService {
constructor(
  private readonly dbConnectionService: DatabaseConnectionService,
) {}


  public async getList( clientId: number, tabla: string ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select id, descripcion from ${ tabla } order by id`,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
}
