import { IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @Length(1, 100)
  name: string;
}
