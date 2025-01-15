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
import { ApiTags } from '@nestjs/swagger';
//services
import { CertificadosService } from '../../services/certificados/certificados.service';


@ApiTags('OrionWS - Scorpio XL - XML - Certificados')
@Controller('scorpio/certificados')
@Auth()
@Controller('certificados')
export class CertificadosController {

constructor(private readonly Service: CertificadosService ) {}

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
