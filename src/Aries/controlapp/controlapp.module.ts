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
import { SucursalesDomicilioController } from './controllers/sucursales domicilio/sucursalesdomicilio.controller';
import { SucursalesDomiciliosService } from './services/sucursalesdomicilio/sucursalesdomicilio.service';
import { ProductoservicioController } from './controllers/productoservicio/productoservicio.controller';
import { ProductoservicioService } from './services/productoservicio/productoservicio.service';
import { ProductoservicioClasificacionesController } from './controllers/productoservicio/clasificaciones/clasificaciones.controller';
import { ProductoservicioClasificacionesService } from './services/productoservicio/clasificaciones/clasificaciones.service';

@Module({
    controllers: 
    [ 
      ControlAppController, 
      EmpresaController, 
      SucursalesController,
      SucursalesDomicilioController,
      //--============================================================================
      // Productos y servicios
      ProductoservicioController,
      // sub nivel
      ProductoservicioClasificacionesController
    ],
    providers:   
    [ 
      ControlAppService,
      DatabaseConnectionService, 
      EmpresaService,
      SucursalesService,
      SucursalesDomiciliosService,
      //--============================================================================
      // Productos y servicios
      ProductoservicioService,
      // sub nivel
      ProductoservicioClasificacionesService

    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlAppModule {}
