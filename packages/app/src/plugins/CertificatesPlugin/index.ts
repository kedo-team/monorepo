import { IWidgetDefinition, IRouteRecord } from '../PluginManager'

const name = 'certificates plugin'
const description = 'Provides stuff to work with all types of certificates'

const routes: IRouteRecord[] = [{
    path: 'request-for-certificate',
    component: () => import('./pages/RequestForCertificatePage.vue'),
    meta: {
        title: 'Запрос справок',
        description: 'Справки направляются в кадровую службу и возвращаются вам обратно в личный кабинет.',
        icon: 'article',
        role: 'app_user'
    }
}]

const widgets: IWidgetDefinition[] = [{
    name: 'Мои справки',
    description: 'Справки, запрошенные мной в кадровой службе',
    imgUrl: 'https://picsum.photos/seed/seed4565/80/60',
    component: () =>
        import('./widgets/MyCertificatesWidget.vue')
}]

export {
    name,
    description,
    routes,
    widgets,
}
