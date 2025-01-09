import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  SocialCreateDto,
  SocialUpdateDto,
  SocialDeleteDto,
  SocialLstDto,
} from '../../dtos/social';
// entidad
import { scorpio_empresa } from '../../../controlapp/empresas/entities/scorpio_empresa.entity';
//datasource 
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//openssl
import * as openssl from 'openssl-nodejs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SocialService {

  constructor(
   private readonly dbConnectionService: DatabaseConnectionService
  ){}
  
  public async XML_Social_Lst(SocialLstDto: SocialLstDto): Promise<any> {
    try {
      const response = await fetch(`${process.env.XML_Social_Lst}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json(),
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Create( clientId: number, SocialCreateDto: SocialCreateDto): Promise<any> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(scorpio_empresa);
      let { id, ...Social } = SocialCreateDto;
      let savedEntity = await repository.save(repository.create(Social));
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo App - Empresas Agregar',
        Mensaje: 'Operacion Realizada con exito.',
        Response: savedEntity,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL- Modulo App - Empresas Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Update( clientId: number, SocialUpdateDto: SocialUpdateDto): Promise<any> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      // let repository = connection.getRepository(scorpio_empresa);
      // let { id, ...Social } = SocialCreateDto;
      // let savedEntity = await repository.save(repository.create(Social));
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo App - Empresas Agregar',
        Mensaje: 'Operacion Realizada con exito.',
        Response: true,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL- Modulo App - Empresas Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Delete( clientId: number, SocialDeleteDto: SocialDeleteDto): Promise<any> {
    try {
      let connection = await this.dbConnectionService.getConnection(clientId);
      let repository = connection.getRepository(scorpio_empresa);
      // let { id, ...Social } = SocialCreateDto;
      // let savedEntity = await repository.save(repository.create(Social));
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo App - Empresas Agregar',
        Mensaje: 'Operacion Realizada con exito.',
        Response: true,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL- Modulo App - Empresas Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Create_key( clientId: number, id: number, base64Encoded: string ): Promise<any> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection( clientId );
      //FUNCION
      const data =  await connection.query(`
        update scorpio_empresa 
            set 
                key = '${ base64Encoded }' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - KEY Agregada.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: "Se Almaceno .key Exitosamente !.",
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

  public async XML_Social_Create_cer( clientId: number, id: number, base64Encoded: string ): Promise<any> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection( clientId );
      //FUNCION
      const data =  await connection.query(`
        update scorpio_empresa 
            set 
                cer = '${ base64Encoded }' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - Certificado Agregado.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: "Se Almaceno .cer Exitosamente !.",
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

  public async XML_Social_Create_txt( clientId: number, id: number, base64Encoded: string ): Promise<any> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection( clientId );
      //FUNCION
      const data =  await connection.query(`
        update scorpio_empresa 
            set 
                txt = '${ base64Encoded }' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - Archivo pass Agregado.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: "Se Almaceno .txt Exitosamente !.",
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

  public async XML_Social_Create_pfx( clientId: number, id: number, base64Encoded: string ): Promise<any> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection( clientId );
      //FUNCION
      const data =  await connection.query(`
        update scorpio_empresa 
            set 
                txt = '${ base64Encoded }' where id = ${id}`);
      return {
        Success: true,
        Titulo: 'Scorpio XL - pfx Agregado.',
        Mensaje: 'Operacion Realizada con exito.',
        Response: "Se Almaceno Certificado PFX Exitosamente !.",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL - pfx No Agregado.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  
  public async XML_Create_pfx(clientId: number, id: number): Promise<any> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      const data = await connection.query(`SELECT "scorpio".openssl_pfx_generar( ${id} )`);

      // Decodificar los valores base64 a binario
      const key = Buffer.from(data.openssl_pfx_generar.openssl.key, 'base64');
      const cer = Buffer.from(data.openssl_pfx_generar.openssl.cer, 'base64');
      const pass = Buffer.from(data.openssl_pfx_generar.openssl.txt, 'base64'); // pass

      // Archivos temporales para OpenSSL
      const privateKeyPath = path.join(__dirname, 'private.key');
      const certPath = path.join(__dirname, 'certificate.crt');
      const caCertPath = path.join(__dirname, 'ca-cert.crt');
      const outputPfxPath = path.join(__dirname, 'output.pfx');

      // Crear los archivos temporales con los buffers decodificados
      fs.writeFileSync(privateKeyPath, key);
      fs.writeFileSync(certPath, cer);
      fs.writeFileSync(caCertPath, pass);

      // Promesa para ejecutar OpenSSL y generar el archivo PFX
      return new Promise((resolve, reject) => {
        const command = `openssl pkcs12 -export -out ${outputPfxPath} -inkey ${privateKeyPath} -in ${certPath} -certfile ${caCertPath} -password pass:${pass.toString('utf8')}`;

        openssl.exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(`Error al generar el archivo PFX: ${stderr || error}`);
          }

          console.log(stdout); // La salida de OpenSSL

          // Leer el archivo PFX generado y convertirlo a base64
          const pfxBuffer = fs.readFileSync(outputPfxPath);
          const pfxBase64 = pfxBuffer.toString('base64');

          // Eliminar archivos temporales creados
          try {
            fs.unlinkSync(privateKeyPath);
            fs.unlinkSync(certPath);
            fs.unlinkSync(caCertPath);
            fs.unlinkSync(outputPfxPath);
          } catch (cleanupError) {
            console.error('Error al eliminar archivos temporales:', cleanupError);
          }

          // Retornar el archivo PFX en base64
          resolve({
            Success: true,
            Titulo: 'Scorpio XL - pfx Agregado.',
            Mensaje: 'Operacion Realizada con exito.',
            Response: "Se Almaceno Certificado PFX Exitosamente !.",
            PfxBase64: pfxBase64,  // El archivo PFX en formato base64
          });
        });
      });
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'Scorpio XL - pfx No Agregado.',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }


}