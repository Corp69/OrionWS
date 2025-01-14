import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
import { ControlAppController } from './controllers/controlapp.controller';
import { ControlAppService } from './services/controlapp.service';
import { EmpresaService } from './services/empresa/empresa.service';
import { EmpresaController } from './controllers/empresa/empresa.controller';
import { SucursalesController } from './controllers/sucursales/sucursales.controller';
import { SucursalesService } from './services/sucursales/sucursales.service';

@Module({
    controllers: 
    [ 
      ControlAppController, 
      EmpresaController, SucursalesController  
    ],
    providers:   
    [ 
      ControlAppService,
      DatabaseConnectionService, 
      EmpresaService,
      SucursalesService  
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlAppModule {}
