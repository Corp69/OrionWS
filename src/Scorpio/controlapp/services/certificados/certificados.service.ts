import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//dto 
import { ResponseDto } from 'src/shared/dtos/Response.dto';
// datasource
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Injectable()
export class CertificadosService {
  
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService
  ) {}

  public async XML_Social_Create_key( clientId: number, id: number, base64Encoded: string ):Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`
        update scorpio_empresa 
            set 
                key = '${base64Encoded}' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - KEY Agregada.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: 'Se Almaceno .key Exitosamente !.',
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL- KEY No Agregada.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Create_cer( clientId: number, id: number, base64Encoded: string):Promise<ResponseDto<any>>{
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`
        update scorpio_empresa 
            set 
                cer = '${base64Encoded}' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - Certificado Agregado.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: 'Se Almaceno .cer Exitosamente !.',
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL- Certificado No Agregado.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Create_txt( clientId: number, id: number, base64Encoded: string ):Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`
        update scorpio_empresa 
            set 
                txt = '${base64Encoded}' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - Archivo pass Agregado.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: 'Se Almaceno .txt Exitosamente !.',
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL- Archivo pass No Agregado.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Create_pfx( clientId: number, id: number , base64Encoded: string ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`
        update scorpio_empresa 
            set 
                pfx = '${base64Encoded}' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - Archivo Pfx Agregado.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: 'Se Almaceno certificado.Pfx Exitosamente !.',
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL- Archivo Pfx No Agregado.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
}