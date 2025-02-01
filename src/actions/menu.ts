import { CMS_REST_URL } from "@/configuration/server";
import { IMenu } from "@/types/menu.types";

const getMenu = async (
  menuLabel: string
): Promise<IMenu> => {
  try {
    const response = await fetch(`${CMS_REST_URL}/api/menus`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1 },
      }
    );
    const pages = await response.json();

    const page = pages.docs.find((p: IMenu) => p.label === menuLabel);

    return page;
  } catch (e) {
    return {} as IMenu;
  }
};

const getMenus = async (
  menuLabels: string[]
): Promise<{ [key: string]: IMenu }> => {
  try {
    const response = await fetch(`${CMS_REST_URL}/api/menus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 1 },
    });
    const pages = await response.json();

    const menusObject = pages.docs
      .filter((p: IMenu) => menuLabels.includes(p.label))
      .reduce((acc: { [key: string]: IMenu }, menu: IMenu) => {
        acc[menu.label] = menu;
        return acc;
      }, {});

    return menusObject;
  } catch (e) {
    return {};
  }
};

export { getMenu, getMenus };
