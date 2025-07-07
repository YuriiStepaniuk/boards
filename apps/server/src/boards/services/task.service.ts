import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { FindOptionsRelations, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../dto/tasks/update-task.dto';
import { BoardEntity } from '../entities/board.entity';

@Injectable()
export class TaskService {
  private readonly relations: FindOptionsRelations<TaskEntity> = {
    board: true,
  };
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async create(data: CreateTaskDto): Promise<TaskEntity> {
    try {
      const board = await this.boardRepository.findOne({
        where: { hashedId: data.boardId },
      });

      if (!board) {
        throw new NotFoundException('Board not found');
      }

      const task = this.taskRepository.create({
        ...data,
        board,
      });

      return this.taskRepository.save(task);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(boardId: string): Promise<TaskEntity[]> {
    try {
      return this.taskRepository.find({
        where: { board: { hashedId: boardId } },
        relations: this.relations,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<TaskEntity> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException('Task was not found');
      }

      return task;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    taskId: number,
    boardId: string,
    data: UpdateTaskDto,
  ): Promise<TaskEntity> {
    const task = await this.findTaskForBoard(taskId, boardId);
    Object.assign(task, data);
    return this.taskRepository.save(task);
  }

  async delete(taskId: number, boardId: string): Promise<void> {
    const task = await this.findTaskForBoard(taskId, boardId);
    await this.taskRepository.remove(task);
  }

  private async findTaskForBoard(
    taskId: number,
    boardId: string,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: this.relations,
    });

    if (!task || task.board.hashedId !== boardId) {
      throw new NotFoundException('Task not found for this board');
    }

    return task;
  }
}
