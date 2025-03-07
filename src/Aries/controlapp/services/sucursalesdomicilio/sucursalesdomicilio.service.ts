import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//Dtos
import { DomicilioSucursalDTO } from '../../dtos/arieserpsucursaldomicilio.dto';

//entidades
import { arieserp_sucursal_domicilio } from '../../entities/arieserp_sucursaldomicilio.entity';



@Injectable()
export class SucursalesDomiciliosService {


  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

  public async obtenerDomicilioSucursal( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select "arieserp".fn_get_catalogo_sucursales_domicilio(${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Sucursales Domicilio - Obtener.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_get_catalogo_sucursales_domicilio,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Sucursales Domicilio - Obtener.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Agregar( clientId: number, DomicilioSucursalDTO: DomicilioSucursalDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(arieserp_sucursal_domicilio);
      let { id, ...DataDto } = DomicilioSucursalDTO;
      await repository.save(repository.create(DataDto)); 
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Sucursales Domicilio - Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se agrego correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Sucursales Domicilio - Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async Actualizar( clientId: number, DomicilioSucursalDTO: DomicilioSucursalDTO ): Promise<ResponseDto<any>> {
    try {

      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(arieserp_sucursal_domicilio);
      const row               = await Repository.preload(DomicilioSucursalDTO);
      const response          = await Repository.save(row);

      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Sucursales - Actualizar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: response,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Sucursales - Actualizar',
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
      const data = await connection.query(`delete from arieserp_sucursal_domicilio where id = ${ id }`);
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