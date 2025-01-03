import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// MODULO AUTHENTICACION
import { AuthModule } from 'src/auth/auth.module';
//SERVICIO GLOBAL
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//CONTROLLERS
import { EmpleadosController } from './controllers/empleados.controller';
//SERVICIOS
import { EmpleadosService } from './services/empleados.service';


@Module({
    controllers: [ EmpleadosController ],
    providers:   [ EmpleadosService, DatabaseConnectionService  ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlRhModule {}
