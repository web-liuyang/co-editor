import EditorController from "./editor-controller";
import EditorWidget from "./editor-widget";
import { Worker } from "../editor/worker";

class Editor {
  private editorWidget: EditorWidget;

  public editorController: EditorController;

  public get widget() {
    return this.editorWidget.widget;
  }

  public constructor(worker: Worker) {
    this.editorController = new EditorController(worker);
    this.editorWidget = new EditorWidget(this.editorController);
  }

  public render(): void {
    this.editorWidget.render();
  }
}

export default Editor;
