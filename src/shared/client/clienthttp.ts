import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
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

  public async httpGet(url: string) {
    try {
      const response = await this.httpService
      .get<any>( url )
      .pipe(
        catchError((error: AxiosError) => {
          console.error('Error:', error.response?.data || error.message);
          throw new Error('algo paso en el servicio: http ');
        }),
      );
      return response;
    } catch (error) {
      console.error('Error http POST request:', error);
      throw error;
    }
  }
}
