import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos/Response.dto';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';


import { createReadStream, readFileSync} from 'fs';
import { join } from 'path';
import * as path from 'path';
import * as pug from 'pug';


@Injectable()
export class OrionMailService {
  
  constructor( 
     private readonly dbConnectionService: DatabaseConnectionService,
     private readonly mailerMain: MailerMain

    ) {}


  public async Configuraciones( clientId: number, id: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection( clientId );
      //FUNCION
      const data =  await connection.query(`SELECT "arieserp".arieserp_configuraciones( ${id} )`);
      return {
        Success: true,
        Titulo: "OrionWS: AriesERP - Modulo Configuraciones - Configuraciones Activas.",
        Mensaje: "Operacion Realizada con exito.",
        Response: data[0].arieserp_configuraciones,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success: false,
          Titulo:  "OrionWS: AriesERP - Modulo Configuraciones - Configuraciones Activas.",
          Mensaje: "Operación no se realizó",
          Response: error.message || error,
        },
        HttpStatus.OK
      );
    }
  }

public async sendMail(): Promise<void> {
      await  this.mailerMain.sendMail({
           to: 'ing.elizandro.casillas@mail.com',
           subject: 'OrionWS - OrionMail - Modulo de Correos activo.' ,
           text: ' hola es un test de Orion WS'
          // html: 'hola',
         })
         .then(() => {
           console.log('Email sent');
         })
         .catch((e) => {
           console.log('Error sending email', e);
         });
     }
}
