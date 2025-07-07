import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from '../services/board.service';
import { UpdateBoardDto } from '../dto/boards/update-board.dto';
import { CreateBoardDto } from '../dto/boards/create-board.dto';
import { BoardEntity } from '../entities/board.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query('limit') limit?: string): Promise<BoardEntity[]> {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    return this.boardService.findAll({ limit: parsedLimit });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':hashedId')
  getBoard(@Param('hashedId') hashedId: string) {
    return this.boardService.findByHashedId(hashedId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createBoardData: CreateBoardDto) {
    return this.boardService.create(createBoardData);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':hashedId')
  updateBoard(
    @Param('hashedId') hashedId: string,
    @Body() data: UpdateBoardDto,
  ) {
    return this.boardService.updateByHashedId(hashedId, data);
  }

  @Delete(':hashedId')
  deleteBoard(@Param('hashedId') hashedId: string) {
    return this.boardService.deleteByHashedId(hashedId);
  }
}
