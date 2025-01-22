import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// shared service
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
// Modulos heredados
import { AuthModule } from 'src/auth/auth.module';
/// controllers
import { ClientesController } from './controllers/clientes/clientes.controller';
import { ClientedomicilioController } from './controllers/clientedomicilio/clientedomicilio.controller';
// servicios 
import { ClienteDomicilioService } from './services/clientedomicilio/clientedomicilio.service';
import { ClienteService } from './services/clientes/cliente.service';

@Module({
    controllers: [ 
        ClientesController,
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

