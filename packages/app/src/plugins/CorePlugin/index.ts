import { IRouteRecord, IWidgetDefinition } from '../PluginManager'

const name = 'Core Plugin'
const description = 'core features'

const routes: IRouteRecord[] = [{
        path: 'tasks',
        component: () => import('./pages/TaskPage.vue'),
        meta: {
            title: 'Мои задачи',
            description: 'Список задач, инициированных мной на согласование, и назначенных мне',
            icon: 'fact_check',
            role: 'app_user'
        }
    },
    {
        path: 'my-requests',
        component: () => import('./pages/MyRequestsPage.vue'),
        meta: {
            title: 'Мои заявки',
            description: 'Заявки, направленные мной',
            icon: 'stars',
            role: 'app_user'
        }
    }
]

const widgets: IWidgetDefinition[] = [{
    name: 'Быстрый навигатор',
    description: 'Кнопки быстрых действий',
    imgUrl: 'https://picsum.photos/seed/seed13/80/60',
    component: () =>
        import('./widgets/QuickActionsWidget.vue')
},
{
    name: 'Мои документы',
    description: 'Документы, требующие моей реакции',
    imgUrl: 'https://picsum.photos/seed/seed11/80/60',
    component: () =>
        import('./widgets/MyActionableDocumentsWidget.vue')
}]

export {
    name,
    description,
    routes,
    widgets,
}