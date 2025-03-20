import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { convertXML } from 'simple-xml-to-json';

@Injectable()
export class clientHttp {
  constructor(private readonly httpService: HttpService) {}

  public async httpPost(url: string, body: any) {
    try {
      const { data }  = await firstValueFrom(
        this.httpService.post<any>(url, body, {
          headers: {
            'Content-Type': 'application/json', // Asegura que el contenido es JSON
          },
        }).pipe(
          catchError((error: AxiosError) => {
            console.error('Error:', error.response?.data || error.message);
            throw new Error('Algo pasó en el servicio HTTP.');
          }),
        ),
      );

      return data;
    } catch (error) {
      console.error('Error http POST request:', error);
      throw error;
    }
  }

  public async httpGet(url: string): Promise<any> {
    try {
      const response = await this.httpService.get<any>( url ).pipe(
         catchError((error: AxiosError) => {
           console.error('Error:', error.response?.data || error.message);
           throw new Error('algo paso en el servicio: http ');
         }),
      );

      return response;
    } catch (error) {
      console.error('Error en la solicitud HTTP GET:', error);
      throw error;
    }
  }

  public async getXml(url: string): Promise<any> {
    try {
      // Extraer y construir URL y parámetros directamente
      const urlSolicitud = new URL(url);
      const queryParams: Record<string, string> = {};
  
      //Se extraen los query params
      urlSolicitud.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
  
      urlSolicitud.search = '';
  
      // Construir URL completa con parámetros
      const urlCompleta = new URL(urlSolicitud.toString());
      Object.entries(queryParams).forEach(([key, value]) => {
        urlCompleta.searchParams.append(key, value);
      });
  
      // Peticion para obtener el XML
      const response = await lastValueFrom(
        this.httpService.get<any>(urlCompleta.toString())
      )

      //Guarda el contenido de la respuesta
      const xmlContenido = response.data;
  
      // Limpieza del XML, elimina lo que es innecesario al principio y al final del XML
      const xmlLimpio = xmlContenido.replace(/.*(?=\.xml)/, '');
      const xmlFinal = xmlLimpio.slice(4).replace(/(<\/cfdi:Comprobante>).*$/, '$1');
  
      // Convertir XML a JSON
      return JSON.stringify(convertXML(xmlFinal));
    } catch (error) {
      console.error('Error en la función getXml:', error);
      throw error;
    }
  }


  

  

}
