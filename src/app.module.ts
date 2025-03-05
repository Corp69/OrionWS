import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ElaModule } from './OpenIA/Ela/Ela.module';
import { OrionMailModule } from './OrionMail/OrionMail.module';
import { MailerModule } from '@nestjs-modules/mailer';
//AriesERP
import { EccsModule }                 from './Aries/Eccs/Eccs.module';
import { ControlAppModule }           from './Aries/controlapp/controlapp.module';
import { ControlContabilidadModule }  from './Aries/controlcontabilidad/controlcontabilidad.module';
import { ControlRhModule }            from './Aries/controlrh/controlrh.module';
import { SpaceModule }                from './Aries/Space/space.module';
import { ConfiguracionesModule }      from './Aries/configuraciones/configuraciones.module';

//Scorpio XL 
import { ScorpioModule } from './Scorpio/scorpio.module';
//shared
import { SharedModule } from './shared/shared.module';
import { ControlcomprasModule } from './Aries/controlcompras/controlcompras.module';
import { ControllogisticaModule } from './Aries/controllogistica/controllogistica.module';
import { ControlventasModule } from './Aries/controlventas/controlventas.module';
import { ControlpmiModule } from './Aries/controlpmi/controlpmi.module';
import { ControlpuntoventaModule } from './Aries/controlpuntoventa/controlpuntoventa.module';

// hhttp cliente axios.
import { HttpModule } from '@nestjs/axios';

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
      //cliente http
      HttpModule, 
      //OrionWS
      AuthModule,
      //Scorpio XL
      ScorpioModule,
      //OpenIA
      EccsModule,
      ElaModule,
      OrionMailModule,
      CommonModule,
      //AriesERP
      ControlAppModule,
      ControlContabilidadModule,
      ControlRhModule,
      ControlcomprasModule,
      ControllogisticaModule,
      ControlventasModule,
      ControlpmiModule,
      ControlpuntoventaModule,
      //datasource
      ConfiguracionesModule,
      //Space
      SpaceModule,
      //Shared
      SharedModule
      
  ]
})
export class AppModule {}
