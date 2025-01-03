import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
import { ControlAppController } from './controllers/controlapp.controller';
import { ControlAppService } from './services/controlapp.service';
import { EmpresaService } from './services/empresa/empresa.service';
import { EmpresaController } from './controllers/empresa/empresa.controller';

@Module({
    controllers: 
    [ 
      ControlAppController, 
      EmpresaController  
    ],
    providers:   
    [ 
      ControlAppService,
      DatabaseConnectionService, 
      EmpresaService  
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlAppModule {}
