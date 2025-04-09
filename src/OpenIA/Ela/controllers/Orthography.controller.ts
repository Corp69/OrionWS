import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { OrthographyService } from '../services/Orthography.service';
import { OrthographyDto } from '../dtos/orthography.dto';
import { ProsConsDiscusserDto } from '../dtos';
import { TranslateDto } from '../dtos/translate.dto';


@ApiTags('OrionWS - OpenIA - ELA.')
@Controller('openia/ela')
export class OrthographyController {

  constructor(private readonly Service: OrthographyService ) {}
  

  @Post('orthography-check')
  public orthographyCheck(
    @Body() orthographyDto: OrthographyDto,
  ) {
    return this.Service.orthographyCheck(orthographyDto);
  }
  @Post('pros-cons-discusser')
  public prosConsDisscusser(
    @Body() ProsConsDiscusserDto: ProsConsDiscusserDto,
  ) {
    return this.Service.prosConsDicusser(ProsConsDiscusserDto);
  }



  @Post('pros-cons-discusser-stream')
  public async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
     const stream = await this.Service.prosConsDicusserStream(prosConsDiscusserDto);

  
    res.setHeader('Content-Type', 'application/json');
    res.status( HttpStatus.OK );

    for await( const chunk of stream ) {
      const piece = chunk.choices[0].delta.content || '';
       console.log(piece);
      res.write(piece);
    }

    res.end();

  }


  @Post('translate')
  translateText(
    @Body() translateDto: TranslateDto,
  ) {
    return this.Service.translateText(translateDto);
  }




}
