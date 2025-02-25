interface IGood {
  id: string;
  label: string;
  name: string;
  description: string;
  price: number;

  url?: string;
  width?: number;
  height?: number;

  order: number;

  siteType?: string;
  content?: any;

  published?: boolean;

  meta: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

export type {
  IGood
}
