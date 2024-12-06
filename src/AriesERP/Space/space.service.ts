import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ResponseDto } from '@shared/dtos/response.dto';

@Injectable()
export class SpaceService {
  
  constructor( private readonly dataSource: DataSource) {}

  public async Contacto(): Promise<ResponseDto<any>> {
    try {
      const data = await this.dataSource.query(`SELECT "space".AriesERP_contacto()`);
      return {
        Success: true,
        Titulo: "OrionWS webservice - Modulo - Authenticacion.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].arieserp_contacto,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: "OrionWS webservice - Modulo - Autenticación.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }




}
