import {MenuDataItem} from "@ant-design/pro-layout";
import {IconMap} from "@/components/Icons";


export const getMenuPaths = (menuData: MenuDataItem[], menuPaths: string[] = []) => {
  menuData.forEach((menu: MenuDataItem) => {
    if (menu.path) {
      menuPaths.push(menu.path);
    }
    if (menu.children) {
      getMenuPaths(menu.children, menuPaths);
    }
  });

  return menuPaths;
}

export const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => (
  menus.map(({icon, children, ...item}) => {
    return {
      ...item,
      icon: icon && IconMap[icon as string] || "",
      children: children && loopMenuItem(children),
    }
  })
);
