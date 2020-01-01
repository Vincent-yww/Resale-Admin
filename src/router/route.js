import Layout from 'src/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
};

// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};

// 作为main组件子页面展示  但不在左侧菜单显示的路由写在otherRoter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  meta: {
    requireAuth: true
  },
  component: Layout,
  children: [
    {
      path: 'home',
      name: 'home',
      title: '首页',
      component: () => import('src/pages/home/home')
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/users',
    name: 'users',
    title: '用户管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'basic',
        name: 'basic',
        title: '普通用户',
        component: () => import('src/pages/users/index/basic')
      },
      {
        path: 'admin',
        name: 'admin',
        title: '管理员用户',
        component: () => import('src/pages/users/index/admin')
      }
    ]
  },
  {
    path: '/category',
    name: 'category',
    title: '类别管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'category_index',
        title: '类别管理',
        component: () => import('src/pages/category/index'),
      }]
  },
  {
    path: '/goods',
    name: 'goods',
    title: '商品管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'goods_index',
        title: '商品管理',
        component: () => import('src/pages/goods/index'),
      }]
  },
  {
    path: '/school',
    name: 'school',
    title: '学校管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'school_index',
        title: '学校管理',
        component: () => import('src/pages/school/index'),
      }]
  },
  {
    path: '/log',
    name: 'log',
    title: '日志管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'log_index',
        title: '操作日志',
        component: () => import('src/pages/log/index')
      }
    ]
  },

];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  ...appRouter
];
