interface ICartItem {
  id: string;
  label: string;
  actualLabel: string;
  name: string;
  description: string;
  optionIndex?: number;
  option: string;
  comment: string;
  price: number;
  quantity: number;
}

interface ICart {
  items?: ICartItem[];
  totalPrice: number;
}

export type {
  ICartItem,
  ICart
}
