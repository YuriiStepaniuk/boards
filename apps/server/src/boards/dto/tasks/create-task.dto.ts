import { IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 100)
  description: string;

  @IsString()
  boardId: string;
}
