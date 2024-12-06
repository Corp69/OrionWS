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
        Titulo:  "OrionWS: AriesERP - Space - Contacto.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].arieserp_contacto,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:  "OrionWS: AriesERP - Space - Contacto.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async Vision(): Promise<ResponseDto<any>> {
    try {
      const data = await this.dataSource.query(`SELECT "space".AriesERP_vision()`);
      return {
        Success: true,
        Titulo: "OrionWS: AriesERP - Space - Vision.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].arieserp_vision,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:  "OrionWS: AriesERP - Space - Vision.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }




}
