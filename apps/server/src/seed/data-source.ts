import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { BoardEntity } from 'src/boards/entities/board.entity';
import { TaskEntity } from 'src/boards/entities/task.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [BoardEntity, TaskEntity],
  synchronize: true,
});
