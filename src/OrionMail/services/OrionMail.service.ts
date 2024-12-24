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
           to: 'ep.lizbeth.28@gmail.com',
           subject: 'OrionWS - OrionMail - Modulo de Correos activo.' ,
           //text: ' hola es un test de Orion WS'
           html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo de Activación de Servicio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Fondo gris */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff; /* Fondo blanco para el contenido */
            border-radius: 10px;
        }
        h1 {
            color: #333333;
            font-size: 24px;
            text-align: center;
        }
        p {
            color: #666666;
            font-size: 16px;
            line-height: 1.6;
            text-align: center;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaaaaa;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hola, somos la empresa ECCS</h1>
        <p>El servicio está activo de Orion WS. ¡Gracias por confiar en nosotros!</p>
        <div class="footer">
            <p>Este es un mensaje automático. Por favor, no responda a este correo.</p>
        </div>
    </div>
</body>
</html>`,
         })
         .then(() => {
           console.log('Email sent');
         })
         .catch((e) => {
           console.log('Error sending email', e);
         });
     }
}
