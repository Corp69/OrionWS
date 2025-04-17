import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';

@Injectable()
export class ControlappService {
constructor(
  private readonly dbConnectionService: DatabaseConnectionService,
) {}


  public async getList( clientId: number, tabla: string ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select id, descripcion from ${ tabla } order by id`,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }
  public async obtenerModulo( clientId: number, idModulo: number ): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        `select id, descripcion from eccs_modulo where id_eccs_aplicacion  = ${ idModulo } order by descripcion`,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async getListEmpresas( clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        ` select
              id,
              nombrecomercial as descripcion
          from arieserp_empresa
          where id_estatus in (1,5)
              and activa is true
          order by id
        `,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado - Empresa.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado - Empresa.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }

  public async getlstSucursalD( clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      const data = await connection.query(
        ` select
              id,
              descripcion
          from arieserp_sucursal
          where id_estatus in (1,5)
              and activo is true
          order by id
        `,
      );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado - sucursal.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado - sucursal.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }





  public async generarPDF( clientId: number): Promise<ResponseDto<any>> {
    try {
      // Obtener la conexión adecuada según el cliente.
      const connection = await this.dbConnectionService.getConnection(clientId);
      //FUNCION
      // const data = await connection.query(
      //   ` select
      //         id,
      //         nombrecomercial as descripcion
      //     from arieserp_empresa
      //     where id_estatus in (1,5)
      //         and activa is true
      //     order by id
      //   `,
      // );
      return {
        Success:  true,
        Titulo:   'OrionWS: AriesERP - Modulo App - listado - Empresa.',
        Mensaje:  'Operacion Realizada con exito.',
        Response: "JVBERi0xLjUKJeLjz9MKMyAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDg4MD4+c3RyZWFtCniczZfdbtowFMfv8xTncruo6+8kuzMhoFQUOpJ2UqddIEhRJ0rVsmrqc+8FdmygpHQ4UcmmqR+2E/v8fP7HObYfgk4RCA0R1VDMgrQIPgcczuxTBhR/7P9IcijugtMeA0ahuAk+fCy+277YgUj80/A4D9b9VKzgJObwWAY3FRMUpndVo0wJEinEMqKirXHOrXFmX1uDHxJTmMGoP4JuCun5xTjNTW7JFOaWvmf96zcsZ272lerhKQglIJSUhHvOUffe8se95FMj3mGI1LIGkpgkjUMquLgK2ZE05xL30Yaj8844bcUrLycdZNdm2B2PICEJacMt6sN1R+dZkg2yUSueeVHXBpdlmpgc4igMeQuu6cjHG2RJOkwy04ZnfpJJiuzKADul6pRTrhoC2TYBMPjpHiFDMhbhY8VjyVypZAzj/stACjqkcBcwua4tXmr75dS9CdW2j63tl1NrcN1lU3ldTLfAxbbyuphiqvrvppRvxdrTnhIacaFQVRFyZUtF48jqb4dqBYwxOMG6y8CVBaBiokPQSr1ZAruMixmPe5Y0JVxhkOkm7qwSUhaTKHJ8lFAwwoRrLNAPz6j1lG3nO1eX0lqpGbRBySpK1qKw547lGjvY4Q/osNobewflZloSHODXe52O3ye4oDvFueQNFffJ0IAmq7R60bFnJcC2cZzoG3sHReehIJrViH6Z467U62bvkp1LtpMds3fThe4RogFNVmn1srtdZUtzjeNk39g7KLvQmvDa3JL2s/N0CL0sT8zgXeILxXfi44bWUHyfHA1oskqrF99ttFuaaxwn/sbeQfFlrImUNeKneWGKS8/p2euQ2KmuQtVQdZ8ODWiySqtXHXvuaK7RRPVq6sDtR7yVsHI8GnYiJTnv9fNjT30u7/phy3m5gE75ODkS5XKNF9WnuK7AzB6eble309tfS5iVbZxqvVBN8ZoI+VO5mN2v4PlYJzF2TPyjS5YLnpdWTqerNsLmhfytsHmh2kH75RIX5gKBMChbiJ2KmYd5ZkwPM6OQopu2Ebsa2qUZghkbvL62EEI/q0+FVXOy+oHfQLlsIXp+XgsfHSUxZbGG/XJ9/RACf9EnTMJvjgiMEhYD962ui8m8xK73Ny3PzCqD0+Kc/3lq+No7Lzh22aE0XsCXcrYsV7PJM94aGqF+A64r8R8KZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1RhYnMvUy9Hcm91cDw8L1MvVHJhbnNwYXJlbmN5L1R5cGUvR3JvdXAvQ1MvRGV2aWNlUkdCPj4vQ29udGVudHMgMyAwIFIvVHlwZS9QYWdlL1Jlc291cmNlczw8L0NvbG9yU3BhY2U8PC9DUy9EZXZpY2VSR0I+Pi9Gb250PDwvRjEgMiAwIFI+Pj4+L1BhcmVudCA0IDAgUi9NZWRpYUJveFswIDAgNTk1IDg0Ml0+PgplbmRvYmoKNSAwIG9iagpbMSAwIFIvWFlaIDAgODUyIDBdCmVuZG9iagoyIDAgb2JqCjw8L1N1YnR5cGUvVHlwZTEvVHlwZS9Gb250L0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZy9XaW5BbnNpRW5jb2Rpbmc+PgplbmRvYmoKNCAwIG9iago8PC9LaWRzWzEgMCBSXS9UeXBlL1BhZ2VzL0NvdW50IDE+PgplbmRvYmoKNiAwIG9iago8PC9OYW1lc1soSlJfUEFHRV9BTkNIT1JfMF8xKSA1IDAgUl0+PgplbmRvYmoKNyAwIG9iago8PC9EZXN0cyA2IDAgUj4+CmVuZG9iago4IDAgb2JqCjw8L05hbWVzIDcgMCBSL1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUi9WaWV3ZXJQcmVmZXJlbmNlczw8L1ByaW50U2NhbGluZy9BcHBEZWZhdWx0Pj4+PgplbmRvYmoKOSAwIG9iago8PC9DcmVhdG9yKEphc3BlclJlcG9ydHMgTGlicmFyeSB2ZXJzaW9uIDYuMjEuNC01NTdmMzVjMjA1NTgyYzE5ZWUwYWQyNWNiNWRkY2UzOTZiYWU2MWMwKS9DcmVhdGlvbkRhdGUoRDoyMDI1MDQxNjE4NDczNVopL1Byb2R1Y2VyKE9wZW5QREYgMS4zLjMyKT4+CmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwOTYyIDAwMDAwIG4gCjAwMDAwMDExOTMgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAxMjgxIDAwMDAwIG4gCjAwMDAwMDExNTggMDAwMDAgbiAKMDAwMDAwMTMzMiAwMDAwMCBuIAowMDAwMDAxMzg2IDAwMDAwIG4gCjAwMDAwMDE0MTggMDAwMDAgbiAKMDAwMDAwMTUyMSAwMDAwMCBuIAp0cmFpbGVyCjw8L0luZm8gOSAwIFIvSUQgWzxjNTE4ZTQ2NTQyMDNmMTI5NWI5Y2NhY2JiN2FhYzMzNj48YzUxOGU0NjU0MjAzZjEyOTViOWNjYWNiYjdhYWMzMzY+XS9Sb290IDggMCBSL1NpemUgMTA+PgpzdGFydHhyZWYKMTY4NQolJUVPRgo=",
      };
    } catch (error) {
      throw new HttpException(
        {
          Success:  false,
          Titulo:   'OrionWS: AriesERP - Modulo App - listado - Empresa.',
          Mensaje:  'Operación no se realizó',
          Response: error.message || error,
        },
        HttpStatus.OK,
      );
    }
  }




}
