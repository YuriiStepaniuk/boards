import z from 'zod';
import { TaskStatus } from '../enums/task-status.enum';

export const taskSchema = z.object({
  title: z.string().min(1, 'Field is required'),
  description: z.string().min(1, 'Field is required'),
  status: z.nativeEnum(TaskStatus).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
