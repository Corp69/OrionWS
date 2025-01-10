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

@Injectable()
export class SocialService {
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
  ) {}

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

  public async XML_Social_Create(
    clientId: number,
    SocialCreateDto: SocialCreateDto,
  ): Promise<any> {
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

  public async XML_Social_Update(clientId: number,SocialCreateDto: SocialCreateDto): Promise<any> {
    try {
      const connection        = await this.dbConnectionService.getConnection(clientId);
      const objeto            = await connection.getRepository(scorpio_empresa);
      const objetoActualizar  = await objeto.preload(SocialCreateDto);
      const response          = await objeto.save(objetoActualizar);
      return {
        Success: true,
        Titulo: 'OrionWS: Scorpio XL - Modulo App - Empresas Actualizar',
        Mensaje: 'Operación realizada con éxito.',
        Response: response,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo: 'OrionWS: Scorpio XL- Modulo App - Empresas Actualizar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Delete(
    clientId: number,
    SocialDeleteDto: SocialDeleteDto,
  ): Promise<any> {
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

  public async XML_Social_Create_key(
    clientId: number,
    id: number,
    base64Encoded: string,
  ): Promise<any> {
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

  public async XML_Social_Create_cer(
    clientId: number,
    id: number,
    base64Encoded: string,
  ): Promise<any> {
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

  public async XML_Social_Create_txt(
    clientId: number,
    id: number,
    base64Encoded: string,
  ): Promise<any> {
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

  public async XML_Create_pfx(
    clientId: number,
    id: number,
    base64Encoded: string,
  ): Promise<any> {
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
