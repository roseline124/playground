type AsyncFunction = (...args: any[]) => Promise<any>;

export class AsyncQueue {
  private running = 0;
  private queue: AsyncFunction[] = [];
  constructor(private readonly concurrency: number = 1) {}

  enqueuer(task: AsyncFunction) {
    this.queue.push(task);
    const queue = this.queue;
    const next = this.next.bind(this);
    return {
      async *[Symbol.asyncIterator]() {
        yield next();
        const task = queue.shift();
        if (task) {
          yield await task();
        }
      },
    };
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift(); // return first element
      if (!task) {
        continue;
      }
      task().finally(() => {
        // 작업 실패 여부와 관련 없이 실행 수를 decrease하고 다음 task를 실행한다.
        this.running--;
        this.next();
      });
      this.running++;
    }
  }
}
