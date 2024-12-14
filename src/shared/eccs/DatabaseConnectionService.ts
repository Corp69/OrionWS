import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

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
          host: 'roundhouse.proxy.rlwy.net',
          port: 14774,
          username: 'postgres',
          password: '3Gc5c63C4Ca*dAc3A-gbe54*A1DGE2e*',
          database: 'Dev',
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




