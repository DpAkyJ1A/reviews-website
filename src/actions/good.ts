import { CMS_REST_URL } from "@/configuration/server";
import { IGood } from "@/types/good.types";

const getGood = async (
  goodLabel: string
): Promise<IGood> => {
  try {
    const response = await fetch(`${CMS_REST_URL}/api/goods`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1 },
      }
    );
    const goods = await response.json();

    const good = goods.docs.find((p: IGood) => p.label === goodLabel);

    return good;
  } catch (e) {
    return {} as IGood;
  }
};

const getGoods = async (
  menuLabels?: string[]
): Promise<IGood[]> => {
  try {
    const response = await fetch(`${CMS_REST_URL}/api/goods`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 1 },
    });
    const goods = await response.json();

    if (!menuLabels) return goods.docs;

    const goodsObject = goods.docs
      .filter((p: IGood) => menuLabels.includes(p.label));

    return goodsObject;
  } catch (e) {
    return [];
  }
};

export { getGood, getGoods };
