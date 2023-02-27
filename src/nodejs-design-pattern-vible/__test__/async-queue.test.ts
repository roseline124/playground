import { AsyncQueue } from '../ch9-async-queue';
import { TaskQueue } from '../task-queue';

jest.setTimeout(500000);
describe('AsyncQueue', () => {
  const asyncQueue = new AsyncQueue();
  //   const taskQueue = new TaskQueue();
  const createTask = (num: number) => async () => console.log(num);
  it('비동기 작업을 하나씩 처리한다', async () => {
    asyncQueue.enqueuer(createTask(0));
    asyncQueue.enqueuer(createTask(1));
    const queue = asyncQueue.enqueuer(createTask(2));
    const generator = queue[Symbol.asyncIterator]();
    await generator.next();
  });

  //   it('task queue', async () => {
  //     await taskQueue
  //       .push(createTask(1))
  //       .push(createTask(2))
  //       .push(createTask(3))
  //       .runTask(createTask(4));
  //   });
});
