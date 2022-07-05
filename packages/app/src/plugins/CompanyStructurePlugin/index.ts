import { IWidgetDefinition, IRouteRecord } from '../PluginManager'
import { RouteRecordRaw } from 'vue-router'

const name = 'Organization plugin'
const description = 'Provides stuff view org structure'

const routes: IRouteRecord[] = [{
    path: '/my-company',
    component: () => import('./pages/MyCompanyPage.vue'),
    meta: {
        title: 'Орг.структура',
        description: 'Организационная структура компании',
        icon: 'account_tree',
        role: 'app_admin'
    }
}]

const widgets: IWidgetDefinition[] = [
    // {
    // name: 'Мои справки',
    // description: 'Справки, запрошенные мной в кадровой службе',
    // imgUrl: 'https://picsum.photos/seed/seed4565/80/60',
    // component: () =>
    //     import('./widgets/MyCertificatesWidget.vue')
// }
]

export {
    name,
    description,
    routes,
    widgets,
}
