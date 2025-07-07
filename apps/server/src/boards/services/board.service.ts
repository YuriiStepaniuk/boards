import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/board.entity';
import { DeleteResult, FindOptionsRelations, Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/boards/create-board.dto';
import { nanoid } from 'nanoid';
import { UpdateBoardDto } from '../dto/boards/update-board.dto';
import { DEFAULT_BOARDS_LIMIT, HASHED_ID_LENGTH } from '../config/constants';

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
        hashedId: nanoid(HASHED_ID_LENGTH),
      });
      return this.boardRepository.save(board);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(params: FindAllParams): Promise<BoardEntity[]> {
    try {
      const limit =
        params.limit && params.limit > 0 ? params.limit : DEFAULT_BOARDS_LIMIT;
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
    return this.findBoard({ id });
  }

  async findByHashedId(hashedId: string): Promise<BoardEntity> {
    return this.findBoard({ hashedId });
  }

  async update(id: number, data: UpdateBoardDto): Promise<BoardEntity> {
    const board = await this.findBoard({ id });
    Object.assign(board, data);
    return this.boardRepository.save(board);
  }

  async updateByHashedId(
    hashedId: string,
    data: UpdateBoardDto,
  ): Promise<BoardEntity> {
    const board = await this.findBoard({ hashedId });
    Object.assign(board, data);
    return this.boardRepository.save(board);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.boardRepository.delete(id);
  }

  async deleteByHashedId(hashedId: string): Promise<DeleteResult> {
    return this.boardRepository.delete({ hashedId });
  }

  private async findBoard(
    where: Partial<Pick<BoardEntity, 'id' | 'hashedId'>>,
  ): Promise<BoardEntity> {
    const board = await this.boardRepository.findOne({
      where,
      relations: this.relations,
    });
    if (!board) throw new NotFoundException('Board was not found');
    return board;
  }
}
