import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdigiaErrorService {

    getErrorMessage(codigo: number): string {
        switch (codigo) {
          case 1:
            return 'Solicitud vacía.';
          case 2:
            return 'Falta un parámetro en la solicitud.';
          case 3:
            return 'Error de sintaxis en la solicitud.';
          case 4:
            return 'Un parámetro está vacío.';
          case 5:
            return 'Un parámetro no es válido.';
          case 6:
            return 'Error de autenticación.';
          case 7:
            return 'Error de conexión a la base de datos.';
          case 8:
            return 'Error de base de datos.';
          case 9:
            return 'Solicitud en proceso.';
          case 10:
            return 'Solicitud creada con éxito.';
          case 11:
            return 'Solicitud vencida.';
          case 101:
            return 'El RFC ya existe.';
          case 102:
            return 'El RFC no existe.';
          case 103:
            return 'Error con el PFX, verificar validez y contraseña.';
          case 201:
            return 'No se encontró UUID.';
          case 202:
            return 'RFC deshabilitado.';
          case 203:
            return 'No existe RFC.';
          case 204:
            return 'No se encontraron comprobantes.';
          default:
            return 'Error desconocido.';
        }
    }
}