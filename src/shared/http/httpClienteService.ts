import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class httpClienteService {
    constructor(private httpService: HttpService) { }


    public async HttpPost(body: any, url: string): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(url, body, {
                    headers: { 'Content-Type': 'application/json' },
                }).pipe(
                    catchError((error: AxiosError) => {
                        throw new Error(`Error en la ejecución: ${error.message}`);
                    }),
                ),
            );
            return response.data;
        } catch (error) {
            throw new Error(`Error al realizar la solicitud POST: ${error}`);
        }
    }

    public async HttpGet(body: any, url: string): Promise<any> {
        return this.httpService.get(url, {
            headers: { 'Content-Type': 'application/json' },
            params: body,
        }).pipe(
            catchError((error: AxiosError) => {
                throw new Error(`Error en la ejecución: ${error.message}`);
            }),
        );
    }




}