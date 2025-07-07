import { BoardEntity } from '../boards/entities/board.entity';
import { TaskEntity } from '../boards/entities/task.entity';
import { AppDataSource } from './data-source';
import { nanoid } from 'nanoid';
import { TaskStatus } from '../boards/enums/task-status.enum';

async function seed() {
  await AppDataSource.initialize();

  const boardRepo = AppDataSource.getRepository(BoardEntity);
  const taskRepo = AppDataSource.getRepository(TaskEntity);

  const existingBoards = await boardRepo.count();
  if (existingBoards > 0) {
    console.log('⚠️  Database already seeded, skipping.');
    return;
  }

  const board = boardRepo.create({
    name: 'Welcome Board',
    hashedId: nanoid(8),
  });
  await boardRepo.save(board);

  const tasks = ['Setup project', 'Add tasks', 'Celebrate'].map(
    (title, index) =>
      taskRepo.create({
        title,
        description: `This is task #${index + 1}`,
        status:
          index === 0
            ? TaskStatus.TODO
            : index === 1
              ? TaskStatus.IN_PROGRESS
              : TaskStatus.DONE,
        board,
      }),
  );

  await taskRepo.save(tasks);

  console.log('✅ Database seeded');
}

async function runSeed() {
  try {
    await seed();
  } catch (e) {
    console.error('❌ Seeding failed', e);
    await AppDataSource.destroy();
    process.exit(1);
  }
  await AppDataSource.destroy();
  process.exit(0);
}

runSeed();
