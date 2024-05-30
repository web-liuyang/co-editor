declare interface Cloneable<T> {
  copyWith(options: unknown): T;
}

declare interface Component {
  widget: HTMLElement;
  render(): void;
}
