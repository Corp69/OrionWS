import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//Dtos
import { querydto } from 'src/Aries/controlapp/dtos/query.dto';
//entidades
import { eccs_centro_datos } from 'src/Aries/controlapp/entities/eccs_centro_datos.entity';



@Injectable()
export class centroDatosVisualizarService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}


  public async ExcuteQuery( clientId: number, querydto: querydto  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`${ querydto.valor }`);
      console.log( data );
      
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Centro de datos',
        Mensaje:  'Consulta generada con exito.',
        Response:  data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Producto Elimiar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}