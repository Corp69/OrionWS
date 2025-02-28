import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SyncService } from '../../services/sync/sync.service';
import { SyncDto, PeticionDto } from '../../dtos/sync';

@ApiTags('OrionWS - Scorpio XL - XML - Syncronizacion.')
@Controller('scorpio/sync')
//@Auth()
export class SyncController {
  constructor(private readonly Service: SyncService) {}

  @Post('data')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Syncronizar [ SAT ]',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Syncronizar [ SAT ].',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Syncronizar [ SAT ]',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
            codigo: 0,
            mensaje: 'No se encontró el parámetro userPade, favor de verificar',
            respuesta: '',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Sync(@Body() SyncDtoDto: SyncDto) {
    return this.Service.XML_Sync(SyncDtoDto);
  }

  @Post('lst')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Syncronizar [ SAT: Peticiones ]',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Syncronizar [ SAT: Peticiones ].',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Syncronizar [ SAT: Peticiones ]',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
            codigo: 0,
            mensaje: 'No se encontró el parámetro userPade, favor de verificar',
            respuesta: '',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Sync_List(@Body() PeticionDto: PeticionDto) {
    return this.Service.XML_Sync_lst(PeticionDto);
  }
}
