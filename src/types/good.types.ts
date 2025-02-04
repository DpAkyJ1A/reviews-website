interface IGood {
  id: string;
  label: string;
  name: string;
  description: string;
  price: number;

  url: string;
  width: number;
  height: number;

  order: number;

  published: boolean;
}

export type {
  IGood
}
