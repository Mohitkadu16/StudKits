'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-project-description.ts';
import '@/ai/flows/send-email-flow.ts';
