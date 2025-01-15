import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';


/// data source de conexiones
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
// XML CONTROLLERS
import { SocialController } from './xml/controllers/social/social.controller';
import { SyncController } from './xml/controllers/sync/sync.controller';
import { ComprobantesController } from './xml/controllers/comprobantes/comprobantes.controller';
import { MulticomController } from './xml/controllers/multicom/multicom.controller';
// XML SERVICES
import { SocialService } from './xml/services/social/social.service';
import { SyncService } from './xml/services/sync/sync.service';
import { ComprobantesService } from './xml/services/comprobantes/comprobantes.service';
import { MulticomService } from './xml/services/multicom/multicom.service';
// Control app Controllers 
import { EmpresaController } from './controlapp/controllers/empresa/empresa.controller';
import { CertificadosController } from './controlapp/controllers/certificados/certificados.controller';
//Contol app Services
import { EmpresasService } from './controlapp/services/empresas/empresas.service';
import { CertificadosService } from './controlapp/services/certificados/certificados.service';



@Module({
    controllers: 
    [ 
      EmpresaController, 
      SocialController, 
      SyncController, 
      ComprobantesController, 
      MulticomController, 
      CertificadosController
   ],
    providers:   
    [ 

      DatabaseConnectionService,
      
      //control app
      EmpresasService,     
      CertificadosService,
      
      //XML
      SocialService, 
      SyncService, 
      ComprobantesService, 
      MulticomService
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ScorpioModule {}
