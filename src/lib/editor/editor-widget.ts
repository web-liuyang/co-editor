import EditorController from "./editor-controller";
import { Worker } from "./worker";
import "./editor-widget.css";

class EditorWidget implements Component {
  private _widget: HTMLElement;

  private oTextarea: HTMLTextAreaElement;

  private oBackstage: HTMLElement;

  private controller: EditorController;

  public get widget() {
    return this._widget;
  }

  public constructor(controller: EditorController) {
    this._widget = document.createElement("div");
    this._widget.id = "editor";
    this.controller = controller;

    this.oTextarea = document.createElement("textarea");
    this.oTextarea.id = "textarea";

    this.oBackstage = document.createElement("div");
    this.oBackstage.id = "backstage";
    this.oBackstage.textContent = this.controller.text;

    this._widget.append(this.oTextarea);
    this._widget.append(this.oBackstage);

    this.oTextarea.addEventListener("click", event => {
      const tar = event.target as HTMLTextAreaElement;
      this.controller.setCurserIndex(tar.selectionStart);
    });

    this.oTextarea.addEventListener("input", event => {
      const tar = event.target as HTMLTextAreaElement;
      this.controller.setWorker({ curserIndex: tar.selectionStart }, tar.value);
    });

    this.oTextarea.addEventListener("scroll", event => {
      this.workerMark();
    });

    this.controller.addListener(() => {
      this.oTextarea.value = this.controller.text;
      this.workerMark();
    });
  }

  private workerMark(): void {
    const oWorkerNames = [...document.getElementsByClassName("worker-name")];
    for (let i = 0; i < oWorkerNames.length; i++) {
      oWorkerNames[i].remove();
    }

    for (const worker of this.controller.workers) {
      if (worker.id === this.controller.currentWorker.id) continue;

      const str1 = this.oTextarea.value.slice(0, worker.curserIndex);
      const str2 = this.oTextarea.value.slice(worker.curserIndex);
      const oTextNode1 = document.createTextNode(str1);
      const oTextNode2 = document.createTextNode(str2);

      const oWorker = this.createWorkerWidget(worker);

      this.oBackstage.innerText = "";

      this.oBackstage.append(oTextNode1);
      this.oBackstage.append(oWorker);
      this.oBackstage.append(oTextNode2);

      const oWorkerRect = oWorker.getBoundingClientRect();
      const oTextareaRect = this.oTextarea.getBoundingClientRect();
      oWorker.style.left = `${oWorkerRect.x - oTextareaRect.left}px`;
      oWorker.style.top = `${oWorkerRect.y - oTextareaRect.top - this.oTextarea.scrollTop - 28}px`;
      this._widget.append(oWorker);
    }
  }

  private createWorkerWidget(worker: Worker): HTMLElement {
    const oWorker = document.createElement("span");
    oWorker.classList.add("worker-name");
    oWorker.textContent = worker.name;

    return oWorker;
  }

  public clean(): void {}

  public update(): void {}

  public render(): void {
    this.oTextarea.value = this.controller.text;
    this.workerMark();
  }
}

export default EditorWidget;
