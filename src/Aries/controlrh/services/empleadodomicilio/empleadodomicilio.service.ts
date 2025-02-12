import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
//servicios
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//Enditades
import { eccs_empleado_domicilio } from '../../entities/empledodomicilio/eccs_empleado_domicilio.entity';
import { DomicilioEmpleadoDTO } from '../../dtos/empledodomicilio/eccs_empleado_domicilio.dto';

@Injectable()
export class EmpleadoDomicilioService {
  
  constructor(  private readonly dbConnectionService: DatabaseConnectionService ) {}

  public async obtenerDomicilio( clientId: number, id: number  ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `SELECT "arieserp_rh".fn_empleados_domicilio(${id})`,
      );
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo RH - Obtener Empleados.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_empleados_domicilio,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo RH - Obtener Empleados.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async agregarDomicilio( clientId: number, DomicilioEmpleadoDTO: DomicilioEmpleadoDTO  ): Promise<ResponseDto<any>> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(eccs_empleado_domicilio);
      let { id, ...DataDto } = DomicilioEmpleadoDTO;
      await repository.save(repository.create(DataDto)); 
      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Sucursales - Agregar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se agrego correctamente!!",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'AriesERP - Modulo App - Sucursales - Agregar',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async actualizarDomicilio( clientId: number, DomicilioEmpleadoDTO: DomicilioEmpleadoDTO ): Promise<ResponseDto<any>> {
    try {

      const connection        = await this.dbConnectionService.getConnection(clientId);
      const Repository        = await connection.getRepository(eccs_empleado_domicilio);
      const row               = await Repository.preload(DomicilioEmpleadoDTO);
      const response          = await Repository.save(row);

      return {
        Success:  true,
        Titulo:   'AriesERP - Modulo App - Sucursales - Actualizar',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "Se actualizó con éxito!!",
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

  public async eliminarDomicilio( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`delete from eccs_empleado_domicilio where id = ${ id }`);
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
