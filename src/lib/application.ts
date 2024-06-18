import { Editor, Worker } from "./editor";

class Application {
  private container: HTMLElement;

  private editor: Editor;

  public constructor(container: HTMLElement) {
    this.container = container;

    const worker = getCurrentWorker();
    this.editor = new Editor(worker);

    const oName = document.createElement("div");
    oName.textContent = `id: ${this.editor.editorController.currentWorker.id}, name: ${this.editor.editorController.currentWorker.name}`;

    this.container.appendChild(oName);
    this.container.appendChild(this.editor.widget);

    this.render();
  }

  public render(): void {
    this.editor.render();
  }
}

function getCurrentWorker(): Worker {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("id") ?? "1";
  const name = url.get("name") ?? "default";

  const worker = new Worker({
    id: id,
    name: name,
    curserIndex: 0,
    focus: false,
  });

  return worker;
}

export default Application;
