import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';


@Injectable()
export class DatabaseConnectionService {
  private readonly connections: Map<number, DataSource> = new Map();

  async getConnection(clientId: number ): Promise<DataSource> {
    const dbConfig = this.getDatabaseConfig(clientId);

    if (this.connections.has( clientId )) {
      return this.connections.get( clientId );
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

  private getDatabaseConfig(clientId: number) {
    // Aquí defines las reglas para seleccionar la base de datos.
    if (clientId === 1) {
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '$2580dev',
        database: 'eccs',
      };
    } else if (clientId === 2) {
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'eccs-user',
        password: '$2580dev',
        database: 'Dev',
      };
    } else if (clientId === 3) {
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




