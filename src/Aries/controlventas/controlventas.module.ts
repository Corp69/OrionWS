import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes/clientes.controller';
import { ClientesdomicilioController } from './controllers/clientesdomicilio/clientesdomicilio.controller';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './services/clientes/cliente.service';
import { ClienteDomicilioService } from './services/clientedomicilio/clientedomicilio.service';


@Module({
    controllers:[ 
        ClientesController, 
        ClientesdomicilioController
    ],
    providers:[ 
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

