import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';

// datasource
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
// Dtos
import { EmpresasDTO } from '../../dtos/empresa/empresas.dto';
// entidad
import { scorpio_empresa } from '../../entities/empresa/scorpio_empresa.entity';

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
      const data = await connection.query(`SELECT "scorpio".app_empresas()`);
      return {
        Success:  true,
        Titulo:   'Scorpio XL - Modulo App - Empresas.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].app_empresas,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'Scorpio XL- Modulo App - Empresas.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async Agregar( clientId: number, EmpresasDTO: EmpresasDTO ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(scorpio_empresa);
      let { id, ...empresaData } = EmpresasDTO;
      let savedEntity = await repository.save(repository.create(empresaData)); 
      return {
        Success:  true,
        Titulo:   'Scorpio XL - Modulo App - Empresas Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: 'Se Almacenó Correctamente !',
      };
    } catch (error) {
      console.log( error );
      
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'Scorpio XL- Modulo App - Empresas Agregar',
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
      const Repository        = await connection.getRepository(scorpio_empresa);
      const row               = await Repository.preload(EmpresasDTO);
      const response          = await Repository.save(row);

      return {
        Success:  true,
        Titulo:   'Scorpio XL - Modulo App - Empresas Actualizar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: 'Se Actualizó Correctamente!',
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'Scorpio XL- Modulo App - Empresas Actualizar',
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
      const data = await connection.query(`delete from scorpio_empresa where id = ${ id }`);
      return {
        Success:  true,
        Titulo:   'Scorpio XL - Modulo App - Empresas Elimiar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Registro eliminado",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'Scorpio XL- Modulo App - Empresas Elimiar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
}
