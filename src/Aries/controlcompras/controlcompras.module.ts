import { Module } from '@nestjs/common';
// modulos adicionales
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//shared
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
//controllers
import { ProveedorController } from './controllers/proveedor/proveedor.controller';
import { ProveedordomicilioController } from './controllers/proveedordomicilio/proveedordomicilio.controller';
//servicios
import { ProveedorService } from './services/proveedor/proveedor.service';
import { ProveedorDomicilioService } from './services/proveedordomicilio/proveedordomicilio.service';

@Module({
    controllers:[ 
      ProveedorController, 
      ProveedordomicilioController 
    ],
    providers:[ 
      DatabaseConnectionService,
      ProveedorService, 
      ProveedorDomicilioService   
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlcomprasModule {}
