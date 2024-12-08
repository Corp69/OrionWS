import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DataSource } from 'typeorm';
import { EccsDTO } from './dto/Eccs.dto';


@Injectable()
export class EccsService {
  
  constructor( private readonly dataSource: DataSource) {}

  public async getActualizaciones( EccsDTO: EccsDTO): Promise<ResponseDto<any>> {
    try {
     const data = await this.dataSource.query(`SELECT "eccs".Orion_Update_realice( ${ EccsDTO._idempresa })`);
      return {
        Success: true,
        Titulo:  "ECCS: AriesERP - Actualizaciones.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].orion_update_realice,
      };
    } catch (error) {
      console.log( error );
      
      throw new HttpException(
        {
          Success: false,
          Titulo:  "ECCS: AriesERP - Actualizaciones.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK
      );
    }
  }
}
