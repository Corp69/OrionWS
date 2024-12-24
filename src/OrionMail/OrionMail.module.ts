import { Module } from '@nestjs/common';

//app.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { OrionMailController } from './controllers/OrionMail.controller';
import { OrionMailService } from './services/OrionMail.service';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';



// @Module({
//     controllers: [ OrionMailController ],
//     providers:   [ OrionMailService, DatabaseConnectionService  ],
//     imports: [
//         AuthModule,
//         ConfigModule,
//         TypeOrmModule.forFeature([])
//       ],
//     exports: [ TypeOrmModule ]
// })

@Module({
  controllers: [ OrionMailController ],
  providers:   [ OrionMailService, DatabaseConnectionService  ],
  imports: [
   
    MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      template: {
        dir: __dirname + './template/notification',
        adapter: new PugAdapter({  inlineCssEnabled: true,}),
        options: {
          strict: true,
        },
      },
    })


  ],
})
export class OrionMailModule {}
