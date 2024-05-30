export interface WorkerOptions {
  id: string;

  name: string;

  curserIndex: number;

  focus: boolean;
}

export class Worker implements Cloneable<Worker> {
  public readonly id: WorkerOptions["id"];

  public readonly name: WorkerOptions["name"];

  public readonly curserIndex: WorkerOptions["curserIndex"];

  public readonly focus: WorkerOptions["focus"];

  public constructor(options: WorkerOptions) {
    this.id = options.id;
    this.name = options.name;
    this.curserIndex = options.curserIndex;
    this.focus = options.focus;
  }

  public copyWith(options: Partial<WorkerOptions>): Worker {
    return new Worker({
      id: options.id ?? this.id,
      name: options.name ?? this.name,
      curserIndex: options.curserIndex ?? this.curserIndex,
      focus: options.focus ?? this.focus,
    });
  }
}
