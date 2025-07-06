import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/tasks/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/tasks/update-task.dto';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':taskId')
  async update(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return this.taskService.update(taskId, boardId, updateTaskDto);
  }

  @Delete(':taskId')
  async delete(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.taskService.delete(taskId, boardId);
  }
}
