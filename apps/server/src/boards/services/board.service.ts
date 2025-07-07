import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/board.entity';
import { DeleteResult, FindOptionsRelations, Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/boards/create-board.dto';
import { nanoid } from 'nanoid';
import { UpdateBoardDto } from '../dto/boards/update-board.dto';
import { BoardResponseDto } from '../dto/boards/board-reponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BoardService {
  private readonly relations: FindOptionsRelations<BoardEntity> = {
    tasks: true,
  };

  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async create(data: CreateBoardDto): Promise<BoardEntity> {
    try {
      const board = this.boardRepository.create({
        name: data.name,
        hashedId: nanoid(8),
      });
      return this.boardRepository.save(board);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(params: FindAllParams): Promise<BoardEntity[]> {
    try {
      const limit = params.limit && params.limit > 0 ? params.limit : 5;
      return this.boardRepository.find({
        take: limit,
        relations: this.relations,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<BoardEntity> {
    try {
      const board = await this.boardRepository.findOne({
        where: { id },
        relations: this.relations,
      });

      if (!board) {
        throw new NotFoundException('Board was not found');
      }

      return board;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByHashedId(hashedId: string): Promise<BoardEntity> {
    try {
      const board = await this.boardRepository.findOne({
        where: { hashedId },
        relations: this.relations,
      });

      if (!board) {
        throw new NotFoundException('Board was not found');
      }

      return board;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, data: UpdateBoardDto): Promise<BoardEntity> {
    try {
      const board = await this.boardRepository.findOne({ where: { id } });

      if (!board) {
        throw new NotFoundException('Board was not found');
      }

      Object.assign(board, data);

      return this.boardRepository.save(board);
    } catch (error) {
      console.error();
      throw error;
    }
  }

  async updateByHashedId(
    hashedId: string,
    data: UpdateBoardDto,
  ): Promise<BoardEntity> {
    try {
      const board = await this.boardRepository.findOne({ where: { hashedId } });

      if (!board) {
        throw new NotFoundException('Board was not found');
      }

      Object.assign(board, data);

      return this.boardRepository.save(board);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      return this.boardRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteByHashedId(hashedId: string): Promise<DeleteResult> {
    try {
      return this.boardRepository.delete({ hashedId });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
