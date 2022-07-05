import { IRouteRecord, IWidgetDefinition } from '../PluginManager'

const name = 'lna plugin'
const description = 'Provides stuff for lna'

const routes: IRouteRecord[] = [{
    path: '/view-lna',
    component: () => import('./pages/ViewLnaPage.vue'),
    meta: {
        title: 'Просмотр ЛНА',
        description: 'Список локальных нормативных актов организации и действия с ними',
        icon: 'description',
        role: 'app_user'
    }
}]

const widgets: IWidgetDefinition[] = [{
    name: 'Перечень актуальных ЛНА',
    description: 'Актуальные в моей организации локальные нормативные акты',
    imgUrl: 'https://picsum.photos/seed/seed09/80/60',
    component: () =>
        import('./widgets/AllLnaWidget.vue')
}]

export {
    name,
    description,
    widgets,
    routes,
}
