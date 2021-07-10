export interface ChatOption {
  text: string;
  next: string;
}

export interface SingleScript {
  title: string;
  type: string;
  option?: ChatOption[];
  next?: string;
}

export interface ChatScript {
  [key: string]: SingleScript
}

export interface ChatBoxOption {
  headImg?: string;
  talkBackground?: string;
  width?: string;
  height?: string;
}

export interface ChatHelperOption extends ChatBoxOption {
  name?: string;
  buttonFontColor?: string;
  buttonColor?: string;
  barColor?: string;
}
