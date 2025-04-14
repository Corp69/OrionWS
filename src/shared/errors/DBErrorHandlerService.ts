import { Injectable } from '@nestjs/common';

@Injectable()
export class DBErrorHandlerService {
  // Método para manejar errores de base de datos
  public handleDBErrors(error: any): { Mensaje: string, Error: any } | null {
    if (error.code === '23505' && error.constraint === 'eccs_empresas_rfc_key') {
      // Retorna un objeto con el mensaje de error específico para RFC duplicado
      return {
        Mensaje: 'RFC ya existe',
        Error: error.message || error,
      };
    }else if (error.code === '23505' && error.constraint === 'scorpio_xml_comprobante_uuid_key') 
    // Si el error no es RFC duplicado, retornamos un error genérico
    {
      return {
        Mensaje: 'UUID ya existe',
        Error: error.message || error,
      };
    }
    return {
      Mensaje: 'Please check server logs',
      Error: error.message || error,
    };
  }
}