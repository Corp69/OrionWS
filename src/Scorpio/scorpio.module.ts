import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';


import { EmpresaController } from './controlapp/empresas/controllers/empresa/empresa.controller';

import { EmpresasService } from './controlapp/empresas/services/empresas/empresas.service';

@Module({
    controllers: 
    [ 
      EmpresaController
   ],
    providers:   
    [ 
      EmpresasService,     
      DatabaseConnectionService
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ScorpioModule {}
