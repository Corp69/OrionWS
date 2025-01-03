import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfiguracionesService } from './services/configuraciones.service';
import { ConfiguracionesController } from './controllers/configuraciones.controller';
import { DatabaseConnectionService } from 'src/shared/eccs/DatabaseConnectionService';

@Module({
    controllers: [ ConfiguracionesController ],
    providers:   [ ConfiguracionesService, DatabaseConnectionService  ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ConfiguracionesModule {}
