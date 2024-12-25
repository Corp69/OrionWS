import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { SpaceModule } from './AriesERP/Space/space.module';
import { EccsModule } from './AriesERP/Eccs/Eccs.module';
import { ElaModule } from './OpenIA/Ela/Ela.module';
import { ConfiguracionesModule } from './AriesERP/configuraciones/configuraciones.module';
import { OrionMailModule } from './OrionMail/OrionMail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ControlAppModule } from './AriesERP/controlapp/controlapp.module';
import { ControlRhModule } from './AriesERP/controlrh/controlrh.module';
import { ControlContabilidadModule } from './AriesERP/controlcontabilidad/controlcontabilidad.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
     TypeOrmModule.forRoot({
       type: 'postgres',
       host: process.env.DB_HOST,
       port: +process.env.DB_PORT,
       database: process.env.DB_NAME,
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,      
       autoLoadEntities: true,
       synchronize: false,
       extra: {
        idleTimeoutMillis: 120000  // Tiempo de inactividad para cerrar en milisegundos (5 minutos)
      }
     }),

     MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      }
    }),

      //OpenIA
      EccsModule,
      ElaModule,
      //OrionWS
      AuthModule,
      OrionMailModule,
      CommonModule,
      //AriesERP
      ControlAppModule,
      ControlContabilidadModule,
      ControlRhModule,
      SpaceModule,
      ConfiguracionesModule
  ],
})
export class AppModule {}
