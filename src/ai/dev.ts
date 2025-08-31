import { config } from 'dotenv';
config();

import '@/ai/flows/generate-personalized-exercises.ts';
import '@/ai/flows/provide-speech-recognition-feedback.ts';
import '@/ai/flows/speak.ts';
