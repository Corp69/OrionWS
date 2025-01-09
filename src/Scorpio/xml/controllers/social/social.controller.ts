import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocialService } from '../../services/social/social.service';

import {
  SocialCreateDto,
  SocialUpdateDto,
  SocialDeleteDto,
  SocialLstDto,
} from '../../dtos/social';

import { Auth, GetUser } from 'src/auth/decorators';
//shared
//files
import { FileInterceptor } from '@nestjs/platform-express';
import {
  fileFilterCer,
  fileFilterKey,
  fileFilterPfx,
  fileFilterTxt,
} from '@shared/file/helpers';

@ApiTags('OrionWS - Scorpio XL - XML - Empresas')
@Controller('scorpio/social')
@Auth()
export class SocialController {
  constructor(private readonly Service: SocialService) {}

  @Post('lst')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Lista Razon Social',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Lista Razon Social.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Lista Razon Social',
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
  public lst(@Body() SocialLstDto: SocialLstDto) {
    return this.Service.XML_Social_Lst(SocialLstDto);
  }

  @Post('agregar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
            id: 1,
            rfc: 'CAVA03231997ECCS',
            observaciones: 'empresa de inovacion',
            nombrecomercial: 'ECCS',
            aviso_privacidad: 'X',
            id_sat_usocfdi: 1,
            id_sat_regimenfiscal: 1,
            id_estatus: 1,
            celular: '+524651068560',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Create(
    @Body() SocialCreateDto: SocialCreateDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.XML_Social_Create(idUser, SocialCreateDto);
  }

  @Post('agregarKey/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilterKey,
      // limits: { fileSize: 1000 }
    }),
  )
  public key(
    @Param('id') id: number,
    @GetUser('id') idUser: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No es un Archivo .key');
    }
    const base64Encoded = file.buffer.toString('base64');
    return this.Service.XML_Social_Create_key(idUser, id, base64Encoded);
  }

  @Post('agregarCer/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilterCer,
      // limits: { fileSize: 1000 }
    }),
  )
  public Cer(
    @Param('id') id: number,
    @GetUser('id') idUser: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No es un Archivo .cer');
    }
    const base64Encoded = file.buffer.toString('base64');
    return this.Service.XML_Social_Create_cer(idUser, id, base64Encoded);
  }

  @Post('agregarTxt/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilterTxt,
      // limits: { fileSize: 1000 }
    }),
  )
  public Txt(
    @Param('id') id: number,
    @GetUser('id') idUser: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No es un Archivo .txt');
    }
    const base64Encoded = file.buffer.toString('base64');
    return this.Service.XML_Social_Create_txt(idUser, id, base64Encoded);
  }

  @Post('agregarPFX/:id')
  public Pfx(
    @Param('id') id: number,
    @GetUser('id') idUser: number
  ) {
    return this.Service.XML_Create_pfx(idUser, id);
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Actualizar',
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
  public Update(
    // @Param('id')    id: number,
    @GetUser('id') idUser: number,
    @Body() SocialUpdateDto: SocialUpdateDto,
  ) {
    return this.Service.XML_Social_Update(idUser, SocialUpdateDto);
  }

  @Post('eliminar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Eliminar',
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
  public Delete(
    // @Param('id')    id: number,
    @GetUser('id') idUser: number,
    @Body() SocialDeleteDto: SocialDeleteDto,
  ) {
    return this.Service.XML_Social_Delete(idUser, SocialDeleteDto);
  }
}
