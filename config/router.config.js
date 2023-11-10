export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/login/:id', component: './login', title: '首页' },
      { path: '/', component: './login', title: '首页' },
      { path: '/*', component: '@/pages/404' }
    ],
  },
]
