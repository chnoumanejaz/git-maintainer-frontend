import { z } from 'zod';

// Login Form Schema
export const loginFormSchema = z.object({
  username: z
    .string({ message: 'Please enter your username.' })
    .trim()
    .toLowerCase()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(49, {
      message: 'Username must be less than 50 characters.',
    })
    .transform(val => val.replace(/\s+/g, '_')),

  password: z.string().trim().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});
export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

// Register form schema
export const registerFormSchema = z.object({
  username: z
    .string({ message: 'Please enter your username.' })
    .trim()
    .toLowerCase()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(49, {
      message: 'Username must be less than 50 characters.',
    })
    .transform(val => val.replace(/\s+/g, '_')),

  email: z.string().email('Please enter a valid email.'),
  password: z
    .string()
    .trim()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
});
export type registerFormSchemaType = z.infer<typeof registerFormSchema>;
