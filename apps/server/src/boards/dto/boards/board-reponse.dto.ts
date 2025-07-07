import { Expose } from 'class-transformer';
import { TaskResponseDto } from '../tasks/task-response.dto';

export class BoardResponseDto {
  @Expose()
  hashedId: string;

  @Expose()
  name: string;

  @Expose()
  tasks: TaskResponseDto[];
}
