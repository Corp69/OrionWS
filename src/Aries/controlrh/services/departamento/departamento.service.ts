import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//dtos
import { DepartamentoDTO } from '../../dtos/departamento/rh_departamento.dto';
//entidades
import { rh_departamento } from '../../entities/departamento/rh_departamento.entity';


@Injectable()
export class DepartamentoService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async getDepartamento( clientId: number , id:     number): Promise<ResponseDto<any>> {

    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select "arieserp_rh".fn_departamento(${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Obtener Departamentos.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_departamento,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Obtener Departamentos.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Agregar( clientId: number, DepartamentoDTO: DepartamentoDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(rh_departamento);
      let { id, ...DataDTO } = DepartamentoDTO;
      let savedEntity = await repository.save(repository.create(DataDTO)); 
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Departamento - Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se agrego correctamente !",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Departamento - Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async Actualizar( clientId: number, DepartamentoDTO: DepartamentoDTO ): Promise<ResponseDto<any>> {
    try {

      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(rh_departamento);
      const row               = await Repository.preload(DepartamentoDTO);
      await Repository.save(row);

      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo RH - Departamento - Actualizar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se actualizo correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Departamento - Actualizar',
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
      await connection.query(`delete from rh_departamento where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   "AriesERP - Modulo RH - Departamento - Elimiar",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Registro eliminado.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "AriesERP - Modulo RH - Departamento - Elimiar",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

}
