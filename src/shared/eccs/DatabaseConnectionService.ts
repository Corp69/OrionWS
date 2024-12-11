import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';


@Injectable()
export class DatabaseConnectionService {
  private readonly connections: Map<string, DataSource> = new Map();

  async getConnection(clientId: string): Promise<DataSource> {
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
    }as DataSourceOptions);

    await newConnection.initialize();
    this.connections.set(clientId, newConnection);

    return newConnection;
  }

  private getDatabaseConfig(clientId: string) {
    // Aquí defines las reglas para seleccionar la base de datos.
    if (clientId === 'dev') {
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '$2580dev',
        database: 'eccs',
      };
    } else if (clientId === 'eccs') {
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'eccs-user',
        password: '$2580dev',
        database: 'Dev',
      };
    } else if (clientId === 'postgresql') {
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '$2580dev',
        database: 'postgres',
      };
    }

    throw new Error(`No database configuration found for clientId: ${clientId}`);
  }

}




