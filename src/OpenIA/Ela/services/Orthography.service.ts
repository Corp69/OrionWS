import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto } from '../dtos/orthography.dto';
import { orthographyCheckUseCase } from '../use-cases/orthography.use-case';

@Injectable()
export class OrthographyService {
  
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

 // Solo va a llamar casos de uso

 async orthographyCheck(orthographyDto: OrthographyDto) {
  return await orthographyCheckUseCase( this.openai, {
    prompt: orthographyDto.prompt
  });
}


}
