import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// shared service
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
// Modulos heredados
import { AuthModule } from 'src/auth/auth.module';
/// controllers
import { ClineteController } from './controllers/cliente/cliente.controller';
import { ClientedomicilioController } from './controllers/clientedomicilio/clientedomicilio.controller';
// servicios 
import { ClienteDomicilioService } from './services/clientedomicilio/clientedomicilio.service';
import { ClienteService } from './services/cliente/cliente.service';

@Module({
    controllers: [ 
        ClineteController,
        ClientedomicilioController
    ],
    providers:   [ 
        DatabaseConnectionService,
        ClienteService,
        ClienteDomicilioService
    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlventasModule {}
