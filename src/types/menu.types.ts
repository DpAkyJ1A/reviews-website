interface IMenuItem {
  id: string;
  label: string;
  url: string;
}

interface IMenu {
  id: string;
  label: string;
  name?: string;
  items: IMenuItem[];
}

export type {
  IMenuItem,
  IMenu
}
