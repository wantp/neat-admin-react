import {useState} from 'react';
import {queryAll} from '@/services/neat_role';
import {Role} from "@/pages/Neat/Role/data";


export default () => {
  const [allRoles, setAllRoles] = useState<Role[]>([]);

  const reloadAllRoles = () => {
    queryAll().then((data) => {
      setAllRoles(data);
    });
  };

  return {
    allRoles,
    reloadAllRoles,
  };
};
