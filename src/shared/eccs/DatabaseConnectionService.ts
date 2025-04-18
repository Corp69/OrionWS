import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

import { arieserp_empresa } from 'src/Aries/controlapp/entities/arieserp_empresa.entity';
import { scorpio_empresa }  from 'src/Scorpio/controlapp/entities/empresa/scorpio_empresa.entity';
import { eccs_cliente } from 'src/Aries/controlventas/entities/clientes/eccs_cliente.entity';
import { eccs_proveedor } from 'src/Aries/controlcompras/entities/proveedor/eccs_proveedor.entity';
import { arieserp_sucursal } from 'src/Aries/controlapp/entities/arieserp_sucursal.entity';
import { arieserp_sucursal_domicilio } from 'src/Aries/controlapp/entities/arieserp_sucursaldomicilio.entity';
import { xml_comprobante_solicita_metada } from 'src/Scorpio/controlapp/entities/solicitudes/xml_comprobante_solicita_metada.entity';
import { eccs_empleado } from 'src/Aries/controlrh/entities/empledo/eccs_empleado.entity';
import { eccs_empleado_domicilio } from 'src/Aries/controlrh/entities/empledodomicilio/eccs_empleado_domicilio.entity';
import { eccs_proveedor_domicilio } from 'src/Aries/controlcompras/entities/proveedor domicilio/eccs_proveedor_domicilio.entity';
import { eccs_cliente_domicilio } from 'src/Aries/controlventas/entities/clientesdomicilio/eccs_cliente_domicilio.entity';
import { rh_departamento } from 'src/Aries/controlrh/entities/departamento/rh_departamento.entity';
import { rh_puesto } from 'src/Aries/controlrh/entities/puesto/rh_puesto.entity';
import { sat_cuenta_nv1 } from 'src/Aries/controlcontabilidad/entities/sat_cuenta_nv1.entity';
import { sat_cuenta_nv2 } from 'src/Aries/controlcontabilidad/entities/sat_cuenta_nv2.entity';
import { eccs_producto_servicio } from 'src/Aries/controlapp/entities/eccs_producto_servicio.entity';
import { eccs_clasificacion_producto_servicio } from 'src/Aries/controlapp/entities/eccs_clasificacion_producto_servicio.entity';
import { scorpio_xml_comprobante } from 'src/Scorpio/xml/entities/comprobantes/scorpio_xml_comprobante.entity';
import { scorpio_xml_comprobante_complemento } from 'src/Scorpio/xml/entities/comprobantes/scorpio_xml_comprobante_complemento.entity';
import { scorpio_xml_comprobante_conceptos } from 'src/Scorpio/xml/entities/comprobantes/scorpio_xml_comprobante_conceptos.entity';
import { scorpio_xml_comprobante_emisor } from 'src/Scorpio/xml/entities/comprobantes/scorpio_xml_comprobante_emisor.entity';
import { scorpio_xml_comprobante_receptor } from 'src/Scorpio/xml/entities/comprobantes/scorpio_xml_comprobante_receptor.entity';
import { scorpio_xml_comprobante_impuestos } from 'src/Scorpio/xml/entities/comprobantes/scorpio_xml_comprobante_impuestos.entity';
import { eccs_producto_servicio_costos } from 'src/Aries/controlapp/entities/eccs_producto_servicio_costos.entity';
import { eccs_producto_servicio_precios } from 'src/Aries/controlapp/entities/eccs_producto_servicio_precios.entity';
import { eccs_centro_datos } from 'src/Aries/controlapp/entities/eccs_centro_datos.entity';
import { eccs_reportes_vista } from 'src/Aries/controlapp/entities/eccs_reportes_vista.entity';


@Injectable()
export class DatabaseConnectionService {
  private readonly connections: Map<number, DataSource> = new Map();
  
  public async getConnection(clientId: number): Promise<DataSource> {
    const dbConfig = this.getDatabaseConfig(clientId);
    if (this.connections.has(clientId)) {
      return this.connections.get(clientId);
    }
    const newConnection = new DataSource({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: false,
      entities: [
          
        //AriesERP
        arieserp_empresa,
        arieserp_sucursal,
        eccs_cliente,
        eccs_proveedor,
        arieserp_sucursal_domicilio,
        eccs_empleado,
        eccs_empleado_domicilio,
        eccs_proveedor_domicilio,
        eccs_cliente_domicilio,
        rh_departamento,
        rh_puesto,
        
        sat_cuenta_nv1,
        sat_cuenta_nv2,
        
        eccs_producto_servicio,
        eccs_clasificacion_producto_servicio,
        eccs_producto_servicio_costos,
        eccs_producto_servicio_precios,

        eccs_centro_datos,
        eccs_reportes_vista,



        //Scorpio XL 
        scorpio_empresa,
        xml_comprobante_solicita_metada,
        scorpio_xml_comprobante,
        scorpio_xml_comprobante_complemento,
        scorpio_xml_comprobante_conceptos,
        scorpio_xml_comprobante_emisor,
        scorpio_xml_comprobante_receptor,
        scorpio_xml_comprobante_impuestos
      
      ],  // Asegúrate de agregar la entidad aquí
      extra: {
        max: 5,                   // Número máximo de conexiones en el pool
        min: 2,                   // Número mínimo de conexiones en el pool
        idleTimeoutMillis: 300000 // Tiempo de inactividad para cerrar  5 min.
      },
    } as DataSourceOptions);
    await newConnection.initialize();
    this.connections.set(clientId, newConnection);
    return newConnection;
  }

  private getDatabaseConfig(clientId: number) {
    // Aquí defines las reglas para seleccionar la base de datos.
    switch (clientId) {
      case 1:
        return {
          type: 'postgres',
          host: 'gondola.proxy.rlwy.net',
          port: 14262,
          username: 'postgres',
          password: 'iesvjllOpXBBXqUCQfOaqLPirWmXHcQG',
          database: 'Dev',
        };
      case 2:
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '12345dev',
          database: 'rsAriesERP',
        };
      default:
        throw new Error(`No database configuration found for clientId: ${clientId}`);
    }
  }

  public async closeConnection(clientId: number): Promise<void> {
    const connection = this.connections.get(clientId);
    if (connection && connection.isInitialized) {
      await connection.destroy();
      this.connections.delete(clientId);
     }
  }

}




