import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Injectable()
export class EmpresasService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}


  public async getEmpresa( clientId: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "scorpio".app_empresas()`,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: Scorpio XL - Modulo App - Empresas.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].app_empresas,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: Scorpio XL- Modulo App - Empresas.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }








}
