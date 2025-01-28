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
  
  public async getCerfiticados( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(`SELECT "scorpio".fn_count_certificados(${ id })`);
      return {
        Success:  true,
        Titulo:   'Scorpio XL - Modulo App - Certificados - Obtener.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data[0].fn_count_certificados,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'Scorpio XL- Modulo App - Certificados - Obtener.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  //=============================================================
  // Certificados DE base64 a BD 
  //=============================================================
  public async ActualizarCer( clientId: number, id: number, CertificadoDTO ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      await connection.query(`
         update scorpio_empresa 
             set 
                 cer = '${CertificadoDTO.certificado}' where id = ${id}`
      );
      return {
        Success:  true,
        Titulo:   "Scorpio XL - Modulo App - Certificado Cer - Agregar.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó certificado .cer Correctamente.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "Scorpio XL - Modulo App - Certificado Cer - Agregar.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async ActualizarTxt( clientId: number, id: number, CertificadoDTO ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      await connection.query(`
         update scorpio_empresa 
             set 
                txt = '${CertificadoDTO.certificado}' where id = ${id}`
      );
      return {
        Success:  true,
        Titulo:   "Scorpio XL - Modulo App - Password txt - Agregar.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó certificado .txt Correctamente.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "Scorpio XL - Modulo App - Password txt - Agregar.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async ActualizarPfx( clientId: number, id: number, CertificadoDTO ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      await connection.query(`
         update scorpio_empresa 
             set 
                pfx = '${CertificadoDTO.certificado}' where id = ${id}`
      );
      return {
        Success:  true,
        Titulo:   "Scorpio XL - Modulo App - Certificado PFX - Agregar.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó certificado .pfx Correctamente.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "Scorpio XL - Modulo App - Certificado PFX - Agregar.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async ActualizarKey( clientId: number, id: number, CertificadoDTO ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      await connection.query(`
         update scorpio_empresa 
             set 
                key = '${CertificadoDTO.certificado}' where id = ${id}`
      );
      return {
        Success:  true,
        Titulo:   "Scorpio XL - Modulo App - Certificado KEY - Agregar.",
        Mensaje:  "Operacion Realizada con exito.",
        Response: "Se Actualizó certificado .key Correctamente.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   "Scorpio XL - Modulo App - Certificado KEY - Agregar.",
          Mensaje:  "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  //=============================================================
  // Certificados DE tipo File a base64  BD
  //=============================================================
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