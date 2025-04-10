import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto } from '../dtos/orthography.dto';
import { orthographyCheckUseCase } from '../use-cases/orthography.use-case';
import { prosConsDicusserUseCase } from '../use-cases/pros-cons-discusser.use-case';
import { ProsConsDiscusserDto } from '../dtos';
import { prosConsDicusserStreamUseCase } from '../use-cases/pros-cons-stream.use-case';
import { translateUseCase } from '../use-cases/translate.use-case';
import { TranslateDto } from '../dtos/translate.dto';
import { textToAudioUseCase } from '../use-cases/text-to-audio.use-case';
import { TextToAudioDto } from '../dtos/text-to-audio.dto';


import * as path from 'path';
import * as fs from 'fs';



@Injectable()
export class OrthographyService {
  
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

 // Solo va a llamar casos de uso

public  async orthographyCheck(orthographyDto: OrthographyDto) {
  return await orthographyCheckUseCase( this.openai, {
    prompt: orthographyDto.prompt
  });
}

public async prosConsDicusser({ prompt }: ProsConsDiscusserDto ) {
  return await prosConsDicusserUseCase(this.openai, { prompt });
}

public async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto ) {
  return await prosConsDicusserStreamUseCase(this.openai, { prompt });
}

public async translateText({ prompt, lang }: TranslateDto ) {
  return await translateUseCase(this.openai, { prompt, lang });
}

//text to audio 

public async textToAudio({ prompt, voice }: TextToAudioDto) {
  return await textToAudioUseCase(this.openai, { prompt, voice });
}

public async textToAudioGetter(fileId: string) {
  const filePath = path.resolve(
    __dirname,
    '../../generated/audios/',
    `${fileId}.mp3`,
  );

  const wasFound = fs.existsSync(filePath);

  if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

  return filePath;
}




}
