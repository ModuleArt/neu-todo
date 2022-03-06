interface DialogAction {
  text: string;
  color?: string;
  left?: boolean;
  onClick(): void;
}

export default DialogAction;
