import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//dtos
import { PuestoDTO } from '../../dtos/puesto/rh_puesto.dto';
//entidades
import { rh_puesto } from '../../entities/puesto/rh_puesto.entity';



@Injectable()
export class PuestoService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async getPuesto( clientId: number , id:     number): Promise<ResponseDto<any>> {

    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select "arieserp_rh".fn_puesto(${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Obtener Puesto.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_puesto,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Obtener Puesto.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Agregar( clientId: number, PuestoDTO: PuestoDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(rh_puesto);
      let { id, ...DataDTO } = PuestoDTO;
      let savedEntity = await repository.save(repository.create(DataDTO)); 
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Puesto - Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se agrego correctamente !",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Puesto - Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async Actualizar( clientId: number, PuestoDTO: PuestoDTO ): Promise<ResponseDto<any>> {
    try {

      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(rh_puesto);
      const row               = await Repository.preload(PuestoDTO);
      await Repository.save(row);

      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo RH - Puesto - Actualizar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se actualizo correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Puesto - Actualizar',
          Mensaje:  'Operacion Realizada con exito.',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
    
  public async Eliminar( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      await connection.query(`delete from rh_puesto where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo RH - Puesto - Elimiar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Registro eliminado.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo RH - Puesto - Elimiar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}
