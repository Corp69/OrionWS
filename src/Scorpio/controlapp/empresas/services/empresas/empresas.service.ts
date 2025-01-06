import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';

// datasource
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
// Dtos
import { EmpresasDTO } from '../../dtos/empresas.dto';
// entidad
import { scorpio_empresa } from '../../entities/scorpio_empresa.entity';

@Injectable()
export class EmpresasService {
  
  constructor(private readonly dbConnectionService: DatabaseConnectionService) {}

  public async getEmpresa( clientId: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      let connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      let data = await connection.query(`SELECT "scorpio".app_empresas()`);
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

  public async Agregar( clientId: number, EmpresasDTO: EmpresasDTO ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      let connection = await this.dbConnectionService.getConnection(clientId);
      // Eliminar el campo 'id' del DTO antes de crear la entidad
      let  { id, ...empresasDTOWithoutId } = EmpresasDTO; // Esto elimina el campo 'id'
      // Crear una instancia de la entidad (mapear datos del DTO sin el id a la entidad correspondiente)
      let empresaEntity = connection.getRepository(scorpio_empresa).create(empresasDTOWithoutId);
      // Guardar la entidad en la base de datos
      let savedEntity = await connection.manager.save(empresaEntity);
  
      return {
        Success:  true,
        Titulo:   'OrionWS: Scorpio XL - Modulo App - Empresas Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: savedEntity,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: Scorpio XL- Modulo App - Empresas Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  
  public async Actualizar( clientId: number, EmpresasDTO: EmpresasDTO ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      let connection = await this.dbConnectionService.getConnection(clientId);
      
      // Buscar la entidad existente utilizando el ID o algún otro identificador
      let empresaExistente = await connection.manager.findOne(scorpio_empresa, {
        where: { id: EmpresasDTO.id },  // Usamos el id desde el DTO para buscar
      });

      return {
        Success:  true,
        Titulo:   'OrionWS: Scorpio XL - Modulo App - Empresas Actualizar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: empresaExistente,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: Scorpio XL- Modulo App - Empresas Actualizar',
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
      let connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      let data = await connection.query(`delete from scorpio_empresa id =${ id }`);
      return {
        Success:  true,
        Titulo:   'OrionWS: Scorpio XL - Modulo App - Empresas Elimiar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: Scorpio XL- Modulo App - Empresas Elimiar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


}
