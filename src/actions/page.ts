import { CMS_REST_URL } from "@/configuration/server";
import { IPage } from "@/types/page.types";

const getPage = async (
  pageLabel: string
): Promise<IPage> => {
  try {
    const response = await fetch(`${CMS_REST_URL}/api/pages`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1 },
      }
    );
    const pages = await response.json();

    const page = pages.docs.find((p: IPage) => p.label === pageLabel);

    return page;
  } catch (e) {
    return {} as IPage;
  }
};

export { getPage };
