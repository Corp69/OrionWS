import { Module }                     from '@nestjs/common';
import { ConfigModule }               from '@nestjs/config';
import { TypeOrmModule }              from '@nestjs/typeorm';
import { AuthModule }                 from 'src/auth/auth.module';
/// data source de conexiones
import { DatabaseConnectionService }  from 'src/shared/eccs/DatabaseConnectionService';
// XML CONTROLLERS
import { SocialController }           from './xml/controllers/social/social.controller';
import { SyncController }             from './xml/controllers/sync/sync.controller';
import { ComprobantesController }     from './xml/controllers/comprobantes/comprobantes.controller';
import { MulticomController }         from './xml/controllers/multicom/multicom.controller';
// XML SERVICES
import { SocialService }              from './xml/services/social/social.service';
import { SyncService }                from './xml/services/sync/sync.service';
import { ComprobantesService }        from './xml/services/comprobantes/comprobantes.service';
import { MulticomService }            from './xml/services/multicom/multicom.service';
// Control app Controllers 
import { EmpresaController }          from './controlapp/controllers/empresa/empresa.controller';
import { CertificadosController }     from './controlapp/controllers/certificados/certificados.controller';
//Contol app Services
import { EmpresasService }            from './controlapp/services/empresas/empresas.service';
import { CertificadosService }        from './controlapp/services/certificados/certificados.service';
// Modulos de Scorpio
import { ControlcfdiModule }          from './controlcfdi/controlcfdi.module';
import { ControlsatModule }           from './controlsat/controlsat.module';
import { ControlsoporteModule }       from './controlsoporte/controlsoporte.module';
import { ControlverificacionModule }  from './controlverificacion/controlverificacion.module';
import { ControlexportacionesModule } from './controlexportaciones/controlexportaciones.module';
import { ConfiguracionesController } from './controlapp/controllers/configuraciones/configuraciones.controller';
import { ControlimpuestosModule }     from './controlimpuestos/controlimpuestos.module';
import { ControlbancoModule }         from './controlbanco/controlbanco.module';
import { ControlconfigModule }        from './controlconfig/controlconfig.module';
import { ControlbitacoraModule }      from './controlbitacora/controlbitacora.module';
import { ConfiguracionesService } from './controlapp/services/configuraciones/configuraciones.service';
import { SolicitudController } from './controlapp/controllers/solicitud/solicitud.controller';
import { SolicitudService } from './controlapp/services/solicitud/solicitud.service';
import { clientHttp } from '@shared/client/clienthttp';


//http cliente axios
import { HttpModule } from '@nestjs/axios';
import { ProdigiaErrorService } from '@shared/errors/ProdigiaErrorService';

@Module({
    controllers: 
    [ 
      //XML 
      EmpresaController,
      SolicitudController,
      SocialController, 
      SyncController, 
      ComprobantesController, 
      MulticomController, 
      CertificadosController, 
      ConfiguracionesController, SolicitudController

      //MODULO SCORPIO
   ],
    providers:   
    [ 

      //shared
      DatabaseConnectionService,
      clientHttp,
      ProdigiaErrorService,
      //control app
      EmpresasService,     
      SolicitudService,     
      CertificadosService,
      ConfiguracionesService,
      
      //XML
      SocialService, 
      SyncService, 
      ComprobantesService, 
      MulticomService
    ],
    imports: [
        HttpModule,
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([]),
        // Modulos de scorpio
        ControlcfdiModule,
        ControlsatModule,
        ControlsoporteModule,
        ControlverificacionModule,
        ControlexportacionesModule,
        ControlimpuestosModule,
        ControlbancoModule,
        ControlconfigModule,
        ControlbitacoraModule
      ],
    exports: [ TypeOrmModule ]
})
export class ScorpioModule {}
