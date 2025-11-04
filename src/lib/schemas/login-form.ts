import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  mobile: z.string().min(10, { message: 'Mobile number must be at least 10 digits' })
    .regex(/^[0-9]+$/, { message: 'Must be a valid mobile number' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;