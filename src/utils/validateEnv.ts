import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  BASE_URL: z.string().url(),
  APP_USERNAME: z.string().min(1, "Username cannot be empty"),
  APP_PASSWORD: z.string().min(1, "Password cannot be empty")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1); // ⛔️ Stop the test run immediately
}

export const env = parsed.data;
