import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/tasks/create-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<TaskEntity[]> {
    return this.taskService.findAll(boardId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.create(createTaskDto);
  }
}
