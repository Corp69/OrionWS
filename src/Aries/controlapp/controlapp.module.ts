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
import { ProductoservicioCostoController } from './controllers/productoservicio/costos/costos.controller';
import { ProductoservicioCostoService } from './services/productoservicio/costos/costos.service';
import { ProductoservicioPrecioController } from './controllers/productoservicio/precios/precios.controller';
import { ProductoservicioPrecioService } from './services/productoservicio/precios/precios.service';
import { centroDatosAgregarService } from './services/controldatos/agregar/agregar.service';
import { centroDatosAgregarController } from './controllers/controldatos/agregar/agregar.controller';
import { centroDatosVisualizarController } from './controllers/controldatos/visualizar/visualizar.controller';
import { centroDatosVisualizarService } from './services/controldatos/visualizar/visualizar.service';
import { reporteDatosAgregarService } from './services/controlreportes/agregar/agregar.service';
import { reporteDatosAgregarController } from './controllers/controlreportes/agregar/agregar.controller';

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
      ProductoservicioCostoController,
      ProductoservicioPrecioController,
      // sub nivel
      ProductoservicioClasificacionesController,
      
      //--============================================================================
      // Control datos
      centroDatosAgregarController,

      //--============================================================================
      // Control datos
      reporteDatosAgregarController,

      // Control datos Visualizar
      centroDatosVisualizarController,
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
      ProductoservicioCostoService,
      ProductoservicioPrecioService,
      // sub nivel
      ProductoservicioClasificacionesService,

      //--============================================================================
      // Control datos
      centroDatosAgregarService,

      //--============================================================================
      // Reporte datos
      reporteDatosAgregarService,

      // Control datos Visualizar
      centroDatosVisualizarService,

    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlAppModule {}
