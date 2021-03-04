export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        component: './Home',
        access: 'routeFilter',
      },
      {
        path: '/neat',
        name: 'neat',
        access: 'routeFilter',
        routes: [
          {
            path: '/neat',
            redirect: '/',
          },
          {
            name: 'users',
            path: '/neat/users',
            component: './Neat/User',
            access: 'routeFilter',
          },
          {
            name: 'roles',
            path: '/neat/roles',
            component: './Neat/Role',
            access: 'routeFilter',
          },
          {
            name: 'permissions',
            path: '/neat/permissions',
            component: './Neat/Permission',
            access: 'routeFilter',
          },
          {
            name: 'menus',
            path: '/neat/menus',
            component: './Neat/Menu',
            access: 'routeFilter',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
];
