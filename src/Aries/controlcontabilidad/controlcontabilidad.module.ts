import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// MODULO AUTHENTICACION
import { AuthModule } from 'src/auth/auth.module';
//SERVICIO GLOBAL
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';
//CONTROLLERS
import { CuentasController } from './controllers/cuentas.controller';
//SERVICIOS
import { CuentasService } from './services/cuentas.service';

@Module({
    controllers: [ CuentasController ],
    providers:   [ CuentasService, DatabaseConnectionService  ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlContabilidadModule {}
