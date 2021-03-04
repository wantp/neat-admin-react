import {Key, useState} from 'react';
import {queryTree} from '@/services/neat_permission';
import {Permission} from '@/pages/Neat/Permission/data';


const idMap = (treePermissions: Permission[]) => {

  const idMapPermission = {};

  const loop = (permissions: Permission[]) => {
    permissions.forEach((permission: Permission) => {
      if (permission.children) {
        loop(permission.children);
      }
      idMapPermission[permission.id] = {...permission};
    });
  }

  loop(treePermissions);

  return idMapPermission;
};

export const attachKey = (permissions: Permission[], preKey = '0-', level: number = 1): Permission[] => {
  return permissions.map((permission: Permission) => {
    const key = preKey + permission.id;
    if (permission.children) {
      return {
        ...permission,
        level,
        title: permission.name,
        key,
        children: attachKey(permission.children, `${key}-`, level + 1),
      };
    }
    return {...permission, level, title: permission.name, key};
  });
};

export const attachValue = (permissions: Permission[], level: number = 1): Permission[] => {
  return permissions.map((permission: Permission) => {
    if (permission.children) {
      if (level >= 3) {
        const {children, ...otherPermission} = permission;
        return {
          ...otherPermission,
          title: permission.name,
          value: permission.id,
        }
      }
      return {
        ...permission,
        title: permission.name,
        value: permission.id,
        children: attachValue(permission.children, level + 1),
      };
    }
    return {...permission, title: permission.name, value: permission.id};
  });
};

export const attachRoot = (permissions: Permission[]): any[] => {
  const selectPermissions = [{id: 0, value: 0, title: 'ROOT', name: 'ROOT', children: permissions}];

  return attachValue(selectPermissions);
};

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<{ checked: Key[]; halfChecked: Key[] } | Key[]>(
    [],
  );
  const [permissionTree, setPermissionTree] = useState<Permission[]>([]);
  const [sortPermissionTree, setSortPermissionTreeState] = useState<any>([]);
  const [selectPermissionTree, setSelectPermissionTree] = useState<Permission[]>([]);
  const [permissionList, setPermissionList] = useState<any>([]);

  const setSortPermissionTree = (permissions: Permission[]) => {
    setSortPermissionTreeState(attachKey(permissions));
  };

  const reloadPermissionTree = () => {
    queryTree().then((data) => {
      setPermissionTree(data);
      setSortPermissionTree(data);
      setSelectPermissionTree(attachRoot(data));
      setPermissionList(idMap(attachKey(data)));
    });
  };

  return {
    checkedKeys,
    setCheckedKeys,
    permissionTree,
    setPermissionTree,
    sortPermissionTree,
    selectPermissionTree,
    permissionList,
    setSortPermissionTree,
    reloadPermissionTree,
  };
};
