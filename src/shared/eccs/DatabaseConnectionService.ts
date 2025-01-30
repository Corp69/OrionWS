import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

import { arieserp_empresa } from 'src/Aries/controlapp/entities/arieserp_empresa.entity';
import { scorpio_empresa }  from 'src/Scorpio/controlapp/entities/empresa/scorpio_empresa.entity';
import { eccs_cliente } from 'src/Aries/controlventas/entities/eccs_cliente.entity';
import { eccs_proveedor } from 'src/Aries/controlcompras/entities/eccs_proveedor.entity';
import { arieserp_sucursal } from 'src/Aries/controlapp/entities/arieserp_sucursal.entity';
import { arieserp_sucursal_domicilio } from 'src/Aries/controlapp/entities/arieserp_sucursaldomicilio.entity';
import { eccs_empleado } from 'src/Aries/controlrh/entities/empledo/eccs_empleado.entity';
import { eccs_empleado_domicilio } from 'src/Aries/controlrh/entities/empledodomicilio/eccs_empleado_domicilio.entity';


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
        




        //Scorpio XL 
        scorpio_empresa
      
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
          host: 'autorack.proxy.rlwy.net',
          port: 29695,
          username: 'postgres',
          password: 'uoSVslGJOokvCiiBltRKiQTYIYAMYupi',
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




