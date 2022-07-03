import { RouteRecordRaw } from 'vue-router';
import { getRoutes } from 'src/plugins/PluginManager';

async function buildRoutes() {
  const allRoutes: RouteRecordRaw[] = [
    {
      path: '/',
      component: () => import('src/pages/BasePage.vue'),
      children: [{
        path: '',
        component: () => import('src/pages/DashboardViewPage.vue'),
        children: []
      }]
    }
  ]

  const pluginsRoute = await getRoutes()
  allRoutes[0]?.children?.push(...pluginsRoute)
  allRoutes.push({
    // Always leave this as last one,
    // but you can also remove it

      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue'),
  })

  return allRoutes

}

export default buildRoutes;
