import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';


import { EmpresaController } from './controlapp/empresas/controllers/empresa/empresa.controller';

import { EmpresasService } from './controlapp/empresas/services/empresas/empresas.service';
import { SocialController } from './xml/controllers/social/social.controller';
import { SyncController } from './xml/controllers/sync/sync.controller';
import { ComprobantesController } from './xml/controllers/comprobantes/comprobantes.controller';
import { MulticomController } from './xml/controllers/multicom/multicom.controller';
import { SocialService } from './xml/services/social/social.service';
import { SyncService } from './xml/services/sync/sync.service';
import { ComprobantesService } from './xml/services/comprobantes/comprobantes.service';
import { MulticomService } from './xml/services/multicom/multicom.service';

@Module({
    controllers: 
    [ 
      EmpresaController, SocialController, SyncController, ComprobantesController, MulticomController
   ],
    providers:   
    [ 
      EmpresasService,     
      DatabaseConnectionService, SocialService, SyncService, ComprobantesService, MulticomService
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ScorpioModule {}
