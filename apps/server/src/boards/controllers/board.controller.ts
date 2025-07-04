import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from '../services/board.service';
import { UpdateBoardDto } from '../dto/boards/update-board.dto';
import { CreateBoardDto } from '../dto/boards/create-board.dto';
import { DeleteResult } from 'typeorm';
import { BoardEntity } from '../entities/board.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<BoardEntity[]> {
    return this.boardService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<BoardEntity> {
    return this.boardService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createBoardData: CreateBoardDto) {
    return this.boardService.create(createBoardData);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<BoardEntity> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.boardService.delete(id);
  }
}
