import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags }    from '@nestjs/swagger';
import { Auth, GetUser }       from 'src/auth/decorators';
import { ExcelService } from '../../services/excel/excel.service';
import { excelDto } from '../../dtos/excel/excel.dto';

@ApiTags('OrionWS - Scorpio XL - XML - EXCEL.')
@Controller('scorpio/xmlexcel')
@Auth()
export class ExcelController {

    constructor(private readonly Service: ExcelService) {}

     @Post('catalogo')
      @ApiOperation({
        summary: 'OrionWS: Scorpio XL - Modulo XML - EXCEL - CATALOGO.',
      })
      @ApiResponse({
        status: 200,
        description: 'OrionWS: Scorpio XL - Modulo XML - EXCEL - CATALOGO.',
        content: {
          'application/json': {
            example: {
              Success: true,
              Titulo: 'OrionWS: Scorpio XL - Modulo XML - EXCEL - CATALOGO.',
              Mensaje: 'Operación Realizada con exito.',
              Response: {
                
              },
            },
          },
        },
      })
      @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
      @ApiResponse({ status: 500, description: 'Error interno del servidor' })
      public GetCatalogoExcel(
        @Body() excelDto: excelDto,
        @GetUser('id') idUser: number,
      ) {
        return this.Service.GetCatalogoExcel(idUser, excelDto);
      }

}
