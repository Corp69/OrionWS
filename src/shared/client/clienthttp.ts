import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

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

  //Armamos los parametros
  public buildQueryParams(url: string): Record<string, string> {
    const parsedUrl = new URL(url);
    const queryParams: Record<string, string> = {};

    parsedUrl.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  public buildUrl(url: string): string {
    const parsedUrl = new URL(url);

    // Elimina los parámetros query
    parsedUrl.search = '';

    return parsedUrl.toString();
  }

  public async httpGet(url: string, queryParams?: Record<string, string>): Promise<any> {
    try {
      const fullUrl = this.buildUrlWithParams(url, queryParams);

      const response = await lastValueFrom(
        this.httpService.get<any>(fullUrl).pipe(
          catchError((error: AxiosError) => {
            console.error('Error:', error.response?.data || error.message);
            throw new Error('Algo pasó en el servicio HTTP');
          }),
        )
      );

      return response.data;
    } catch (error) {
      console.error('Error en la solicitud HTTP GET:', error);
      throw error;
    }
  }

  private buildUrlWithParams(url: string, queryParams?: Record<string, string>): string {
    if (!queryParams) return url;

    const urlObject = new URL(url);
    Object.entries(queryParams).forEach(([key, value]) => {
      urlObject.searchParams.append(key, value);
    });

    return urlObject.toString();
  }

  

}
