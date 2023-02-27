export class TaskQueue {
  private running = 0;
  private queue: Function[] = [];
  constructor(private readonly concurrency: number = 1) {}

  push(task: Function) {
    this.queue.push(task);
    process.nextTick(this.next.bind(this)); // this.next가 process.nextTick에 의해 호출될 때는 컨텍스트를 잃어버리므로 바인딩 해준다
    return this;
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

  runTask(task: Function) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        return task().then(resolve, reject);
      });
      process.nextTick(this.next.bind(this));
    });
  }
}
