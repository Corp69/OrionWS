import * as path from 'path';
import * as fs from 'fs';

import OpenAI from 'openai';

interface Options {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (
  openai: OpenAI,
  { prompt, voice }: Options,
) => {

  const voices = {
    nova: 'nova',
    alloy: 'alloy',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    shimmer: 'shimmer',
  };

  const selectedVoice = voices[voice] ?? 'nova';

  const folderPath = path.resolve(__dirname, '../../../generated/audios/');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: prompt,
    response_format: 'mp3',
  });


  const arrayBuffer: ArrayBuffer = await mp3.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer); // Convertir a Uint8Array
  fs.writeFileSync(speechFile, uint8Array);

  return speechFile;
};