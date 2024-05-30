import { ChangeNotifier } from "../notifier";
import { Worker, WorkerOptions } from "../editor/worker";
import Sharer from "../shared/sharer";

class EditorController extends ChangeNotifier {
  private sharer: Sharer = new Sharer();

  private _currentWorker: Worker;

  public get currentWorker(): Worker {
    return this._currentWorker;
  }

  public get text(): string {
    return this.sharer.text;
  }

  public setText(text: string) {
    this.sharer.send({ worker: this._currentWorker, text: text });

    this.notifyListeners();
  }

  public get curserIndex(): number {
    return this._currentWorker.curserIndex;
  }

  public setCurserIndex(index: number): void {
    this._currentWorker = this._currentWorker.copyWith({ curserIndex: index });

    this.sharer.send({ worker: this._currentWorker, text: this.text });

    this.notifyListeners();
  }

  public get workers(): Worker[] {
    return this.sharer.workers;
  }

  public setWorker(workerOptions: Omit<Partial<WorkerOptions>, "id" | "name">, text: string | undefined): void {
    this._currentWorker = this._currentWorker.copyWith({
      curserIndex: workerOptions.curserIndex ?? this.curserIndex,
      focus: workerOptions.focus ?? this._currentWorker.focus,
    });

    this.sharer.send({ worker: this._currentWorker, text: text ?? this.text });
  }

  public constructor(worker: Worker) {
    super();
    this._currentWorker = worker;

    this.sharer.addListener(data => {
      this.notifyListeners();
    });
  }
}

export default EditorController;
