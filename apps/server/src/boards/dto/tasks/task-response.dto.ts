import { Expose } from 'class-transformer';
import { TaskStatus } from 'src/boards/enums/task-status.enum';

export class TaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: TaskStatus;
}
