import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

import { EmpresasDTO } from '../../dtos/arieserp_empresas.dto';
import { arieserp_empresa } from '../../entities/arieserp_empresa.entity';

@Injectable()
export class EmpresaService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async getSucursal( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp".fn_get_empresa(${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Empresas - Obtener.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_get_empresa,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Empresas - Obtener.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Catalogo( clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp".fn_get_catalogo_empresas()`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Empresas - Catalogo.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_get_catalogo_empresas,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Empresas - Catalogo.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }



  public async Agregar( clientId: number, EmpresasDTO: EmpresasDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(arieserp_empresa);
      let { id, ...empresaData } = EmpresasDTO;
      let response = await repository.save(repository.create(empresaData)); 
      return {
        Success:  true,
        Id:       response.id,
        Titulo:   'AriesERP - Modulo App - Empresas Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se agrego correctamente",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Empresas Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Actualizar( clientId: number, EmpresasDTO: EmpresasDTO ): Promise<ResponseDto<any>> {
    try {

      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(arieserp_empresa);
      const row               = await Repository.preload(EmpresasDTO);
      const response          = await Repository.save(row);

      return {
        Success:  true,
        Id:       response.id,
        Titulo:   'AriesERP - Modulo App - Empresas Actualizar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se actualizo correctamente!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Empresas Actualizar',
          Mensaje:  'Operación no se realizó',
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
      const data = await connection.query(`delete from arieserp_empresa where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Empresas Elimiar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Registro eliminado.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Empresas Elimiar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


}
