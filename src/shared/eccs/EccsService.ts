import { Injectable } from '@nestjs/common';
import { DatabaseConnectionService } from './DatabaseConnectionService';


@Injectable()
export class EccsService {
  
  constructor(private readonly dbConnectionService: DatabaseConnectionService) {}

  async fetchData(clientId: number ): Promise<any> {
    // Decidir qué base de datos usar con base en el cliente.
    const connection = await this.dbConnectionService.getConnection(clientId);
    // Ejecutar consultas en la conexión adecuada.
    const result = await connection
      .getRepository(EccsService)
      .find();
    return result;
  }
}