import {useState} from 'react';
import {queryTree} from '@/services/neat_menu';
import {Menu} from '@/pages/Neat/Menu/data';


const idMap = (treeMenus: Menu[]) => {

  const idMapMenu = {};

  const loop = (menus: Menu[]) => {
    menus.forEach((menu: Menu) => {
      if (menu.children) {
        loop(menu.children);
      }
      idMapMenu[menu.id] = {...menu};
    });
  }

  loop(treeMenus);

  return idMapMenu;
};

export const attachKey = (menus: Menu[], preKey = '0-', level: number = 1): Menu[] => {
  return menus.map((menu: Menu) => {
    const key = preKey + menu.id;
    if (menu.children) {
      return {
        ...menu,
        level,
        title: menu.name,
        key,
        children: attachKey(menu.children, `${key}-`, level + 1),
      };
    }
    return {...menu, level, title: menu.name, key};
  });
};

export const attachValue = (menus: Menu[]): Menu[] => {
  return menus.map((menu: Menu) => {
    if (menu.children) {
      return {...menu, title: menu.name, value: menu.id, children: attachValue(menu.children)};
    }
    return {...menu, title: menu.name, value: menu.id};
  });
};

export const attachRoot = (menus: Menu[]): Menu[] => {
  const selectMenus = [{id: 0, value: 0, title: '根菜单', name: '根菜单', children: menus}];

  return attachValue(selectMenus);
};

export default () => {
  const [menuTree, setMenuTree] = useState<any[]>([]);
  const [sortMenuTree, setSortMenuTreeState] = useState<any[]>([]);
  const [selectMenuTree, setSelectMenuTree] = useState<any[]>([]);
  const [menuList, setMenuList] = useState<any>([]);

  const reloadMenuTree = () => {
    queryTree().then((data) => {
      setMenuTree(data);
      setSortMenuTreeState(attachKey(data));
      setSelectMenuTree(attachRoot(data));
      setMenuList(idMap(attachKey(data)));
    });
  };

  const setSortMenuTree = (menus: Menu[]) => {
    setSortMenuTreeState(attachKey(menus));
  };

  return {
    menuTree,
    setMenuTree,
    sortMenuTree,
    selectMenuTree,
    menuList,
    setSortMenuTree,
    reloadMenuTree,
  };
};
