import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '@shared/dtos/Response.dto';
import { DatabaseConnectionService } from '@shared/eccs/DatabaseConnectionService';
import { excelDto } from '../../dtos/excel/excel.dto';

@Injectable()
export class ExcelService {
      constructor(
        private readonly dbConnectionService: DatabaseConnectionService
      ) {}

        public async GetCatalogoExcel( clientId: number, excelDto: excelDto ): Promise<ResponseDto<any>> {
          try {
            // Obtener la conexión adecuada según el cliente.
            const connection = await this.dbConnectionService.getConnection(clientId);
            //FUNCION
            const data = await connection.query(
              `SELECT "scorpio_xml".fn_get_xml_comprobantes_excel(
            '${excelDto._fechainicio}',
            '${excelDto._fechatermina}',
            ${excelDto._id_tipo}
              )`,
            );
            return {
              Success:  true,
              Titulo:   'Scorpio XL - Modulo XML - EXCEL - CATALOGO',
              Mensaje:  'Operacion Realizada con exito.',
              Response: data[0].fn_get_xml_comprobantes_excel,
            };
          } catch (error) {
            throw new HttpException(
              {
                Success:  false,
                Titulo:   'Scorpio XL - Modulo XML - EXCEL - CATALOGO',
                Mensaje:  'Operación no se realizó',
                Response: error.message || error,
              },
              HttpStatus.OK,
            );
          }
        }

}
