import z from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
});

export type TaskFormData = z.infer<typeof taskSchema>;
