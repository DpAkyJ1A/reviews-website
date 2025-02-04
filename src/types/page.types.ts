interface IPage {
  label: string;
  url: string;
  title: string;
  content?: { [key: string]: any };
  meta: {
    title: string;
    description?: string;
    keywords?: string;
  };
}

export type {
  IPage
}
