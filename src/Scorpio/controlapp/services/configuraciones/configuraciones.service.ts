import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
// datasource
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Injectable()
export class ConfiguracionesService {
  
  constructor( private readonly dbConnectionService: DatabaseConnectionService) {}

  public async getConfiguracion( clientId: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio".scorpio_configuraciones()`);
      return {
        Success:  true,
        Titulo:   'Scorpio XL - Modulo App - Configuraciones - Obtener',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].scorpio_configuraciones,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'Scorpio XL- Modulo App - Configuraciones - Obtener.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  

  
}
