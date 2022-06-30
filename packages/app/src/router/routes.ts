import { RouteRecordRaw } from 'vue-router';
import { getRoutes } from 'src/plugins/PluginManager';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/BasePage.vue'),
    children: [{
      path: '',
      component: () => import('../pages/DashboardViewPage.vue')
    }]
    // component: () => import('../pages/DashboardViewPage.vue')
    // children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  }
];

routes[0]?.children?.push(...getRoutes());
routes.push(  
// Always leave this as last one,
// but you can also remove it
{
  path: '/:catchAll(.*)*',
  component: () => import('pages/ErrorNotFound.vue'),
})

export default routes;
