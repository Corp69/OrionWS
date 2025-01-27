import { Controller } from '@nestjs/common';

//shared files
import { FileInterceptor } from '@nestjs/platform-express';
import {
  fileFilterCer,
  fileFilterKey,
  fileFilterPfx,
  fileFilterTxt,
} from '@shared/file/helpers';

import {
    BadRequestException,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';

// modulo - decoradores 
import { Auth, GetUser } from 'src/auth/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//services
import { CertificadosService } from '../../services/certificados/certificados.service';


@ApiTags('OrionWS - Scorpio XL - Modulo App - Certificados')
@Controller('scorpio/certificados')
@Auth()
@Controller('certificados')
export class CertificadosController {

  constructor(private readonly Service: CertificadosService ) {}
  //=============================================================
  // Certificados DE tipo File a base64 
  //=============================================================
  @Post('obtener/:id')
  @ApiOperation({ summary: 'Scorpio XL - Modulo App - Certificados - obtener.' })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo App - Certificados - obtener.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:  'Scorpio XL - Modulo App - Certificados.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {
              "certificados": [
                  {
                      "id": 27,
                      "cer": "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvkl...\">",
                      "key": "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvkl...\">",
                      "pass": "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvkl...\">",
                      "pfx": "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvkl...\">"
                  }
              ]
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo App - Empresas - Certificados.',
    content: {
      'application/json': {
        example: {
          message: 'No tienes Autorizacion.',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public getConf(
    @GetUser('id') idUser: number,
    @Param('id')   id:     number,
  ) {
    return this.Service.getCerfiticados(idUser, id);
  }


  //=============================================================
  // Certificados DE tipo File a base64 
  //=============================================================
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
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilterPfx,
      // limits: { fileSize: 1000 }
    }),
  )
  public Pfx(
    @Param('id')    id:     number,
    @GetUser('id')  idUser: number,
    @UploadedFile() file:   Express.Multer.File,
  ) 
  {
    if (!file) {
    throw new BadRequestException('No es un Archivo .pfx');
    }
    const base64Encoded = file.buffer.toString('base64');
    return this.Service.XML_Create_pfx(idUser, id, base64Encoded);
  }


}
