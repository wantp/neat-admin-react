// src/access.ts
import {Route} from "@umijs/route-utils/dist/types";

export default function access(initialState: { currentUser?: API.CurrentUser | undefined, menuPaths: string[] }) {
  const {menuPaths} = initialState || {};
  return {
    routeFilter: (route: Route) => {
      return menuPaths && (route.path && menuPaths.includes(route.path))
    },
  };
}
