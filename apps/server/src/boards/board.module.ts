import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { BoardService } from './services/board.service';
import { TaskController } from './controllers/task.controller';
import { BoardController } from './controllers/board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { BoardEntity } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, BoardEntity])],
  providers: [TaskService, BoardService],
  controllers: [TaskController, BoardController],
})
export class BoardModule {}
