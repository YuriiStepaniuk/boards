import { Expose } from 'class-transformer';
import { TaskResponseDto } from '../tasks/task-response.dto';

export class BoardResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  tasks: TaskResponseDto[];
}
