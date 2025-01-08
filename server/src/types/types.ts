// collections such as home, menu etc are Vessels
export interface Vessel {
  slug: string;
  name: string;
  data: any;
}

export interface Component {
  type: ComponentTypes;
  name: string;
  id?: string;
  permissions?: [Permissions, Permissions, Permissions];
}

// CreateContainer can contain other BaseContainer Objects
export interface Container extends Component {
  type: ComponentTypes.Container;
  children: Component[];
}

export interface SinglelineText extends Component {
  type: ComponentTypes.SinglelineText;
  content?: string;
}

export interface NumberInput extends Component {
  type: ComponentTypes.NumberInput;
  content?: number;
}

export interface MultilineText extends Component {
  type: ComponentTypes.MultilineText;
  content?: string;
  lines: number;
}

export interface Checkbox extends Component {
  type: ComponentTypes.Checkbox;
  value: boolean;
}

enum Permissions {
  Admin = "Admin",
  User = "User",
  Public = "Public",
}

export enum ComponentTypes {
  Container = "Container",
  NumberInput = "NumberInput",
  SinglelineText = "SinglelineText",
  MultilineText = "MultilineText",
  Checkbox = "Checkbox",
}
