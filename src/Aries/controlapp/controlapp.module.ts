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
import { agregarDatosService } from './services/controldatos/agregar/agregarDatos.service';
import { visualizarDatosService } from './services/controldatos/visualizar/visualizarDatos.service';
import { agregarReporteService } from './services/controlreportes/agregarReportes/agregarReportes.service';
import { AgregarDatosController } from './controllers/controldatos/agregarDatos/agregarDatos.controller';
import { VisualizarDatosController } from './controllers/controldatos/visualizarDatos/visualizarDatos.controller';
import { AgregarReportesController } from './controllers/controlreportes/agregarReportes/agregarReportes.controller';
import { VisualizarReportesController } from './controllers/controlreportes/visualizarReportes/visualizarReportes.controller';
import { visualizarReportesService } from './services/controlreportes/visualizarReportes/visualizarReportes.service';

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
      AgregarDatosController,

      //--============================================================================
      // Control Reportes
      AgregarReportesController,

      // Control datos Visualizar
      VisualizarDatosController,

      // Reportes PDF Visualizar
      VisualizarReportesController,
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
      agregarDatosService,

      //--============================================================================
      // Reporte datos
      agregarReporteService,

      // Control datos Visualizar
      visualizarDatosService,

      // Reporte Datos Visualizar
      visualizarReportesService,

    ],
    imports: [
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([])
      ],
    exports: [ TypeOrmModule ]
})
export class ControlAppModule {}
