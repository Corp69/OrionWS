import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// MODULO AUTHENTICACION
import { AuthModule } from 'src/auth/auth.module';
//SERVICIO GLOBAL
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//CONTROLLERS
import { EmpleadodomicilioController } from './controllers/empleadodomicilio/empleadodomicilio.controller';
import { EmpleadoController } from './controllers/empleado/empleado.controller';
//SERVICIOS
import { EmpleadoDomicilioService } from './services/empleadodomicilio/empleadodomicilio.service';
import { EmpleadoService } from './services/empleado/empleado.service';


@Module({
    controllers: [ 
      EmpleadoController, 
      EmpleadodomicilioController 
    ],
    providers:   [ 
        EmpleadoService, 
        EmpleadoDomicilioService, 
        DatabaseConnectionService  ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlRhModule {}
