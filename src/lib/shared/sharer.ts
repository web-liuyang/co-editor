import { Worker } from "../editor/worker";
import { Notifier } from "../notifier";

interface SharedSendData {
  worker: Worker;
  text: string;
}

interface SharedReceiveData {
  sender: Worker;
  workers: Worker[];
  text: string;
}

const channel = new BroadcastChannel("Channel");

class SharerNotifier extends Notifier<SharedReceiveData> {
  public override notifyListeners(value: SharedReceiveData): void {
    for (const cb of this.listeners) {
      cb(value);
    }
  }
}

export default class Sharer extends SharerNotifier {
  public get workers(): Worker[] {
    return JSON.parse(localStorage.getItem("workers") || "[]");
  }

  public get text(): string {
    return localStorage.getItem("text") || "";
  }

  public constructor() {
    super();

    channel.addEventListener("message", e => {
      const data = e.data as SharedReceiveData;
      this.notifyListeners({
        sender: this.toWorker(data.sender),
        workers: data.workers.map(worker => this.toWorker(worker)),
        text: data.text,
      });
    });
  }

  public send({ worker, text }: SharedSendData): void {
    const workers: Worker[] = this.workers;
    const index = workers.findIndex(item => item.id === worker.id);
    if (index === -1) {
      workers.push(worker);
    } else {
      workers[index] = worker;
    }

    localStorage.setItem("workers", JSON.stringify(workers));
    localStorage.setItem("text", text);
    channel.postMessage({ sender: worker, workers, text });
  }

  private toWorker(workerFaker: Worker): Worker {
    const worker = new Worker({
      id: workerFaker.id,
      name: workerFaker.name,
      curserIndex: workerFaker.curserIndex,
      focus: workerFaker.focus,
    });

    return worker;
  }

  public clear(): void {
    localStorage.removeItem("workers");
    localStorage.removeItem("text");
  }
}
