
'use server';
/**
 * @fileOverview A simple text-to-speech flow.
 *
 * - speak - A function that converts text to speech.
 * - SpeakInput - The input type for the speak function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const SpeakInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  languageCode: z.string().optional().describe('The language of the text (e.g., "en-US", "es-ES"). Defaults to "en-US" if not provided.'),
});
export type SpeakInput = z.infer<typeof SpeakInputSchema>;


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const speakFlow = ai.defineFlow(
  {
    name: 'speakFlow',
    inputSchema: SpeakInputSchema,
    outputSchema: z.object({ media: z.string() }),
  },
  async ({ text, languageCode }) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
          languageCode: languageCode || 'en-US'
        },
      },
      prompt: text,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);

export async function speak(input: SpeakInput) {
    return speakFlow(input);
}
