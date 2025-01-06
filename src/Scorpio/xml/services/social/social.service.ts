
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


import { SocialCreateDto,
         SocialUpdateDto,
         SocialDeleteDto,
         SocialLstDto
 } from '../../dtos/social';

@Injectable()
export class SocialService {

  public async XML_Social_Lst( SocialLstDto: SocialLstDto ): Promise<any> {
    try {
      const response = await fetch(`${process.env.XML_Social_Lst}`,{
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json()
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Create( SocialCreateDto: SocialCreateDto ): Promise<any> {
    try {
      const response = await fetch(`${process.env.XML_Social_Create}`,{
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json()
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Update( SocialUpdateDto: SocialUpdateDto ): Promise<any> {
    try {
      const response = await fetch(`${process.env.XML_Social_Update}`,{
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json()
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async XML_Social_Delete( SocialDeleteDto: SocialDeleteDto ): Promise<any> {
    try {
      const response = await fetch(`${process.env.XML_Social_Delete}`,{
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud externa: ${response.statusText}`,
        );
      }
      // Retornamos la respuesta formateada si la solicitud fue exitosa
      return {
        Success: true,
        Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
        Mensaje: 'Operación Realizada con exito.',
        Response: await response.json()
      };
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message);
      throw new HttpException(
        {
          Success: false,
          Titulo:  'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }



}
