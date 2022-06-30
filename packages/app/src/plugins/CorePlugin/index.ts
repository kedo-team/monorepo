import { IWidgetDefinition } from '../PluginManager'
import { RouteRecordRaw } from 'vue-router'

const name = 'Core Plugin'
const description = 'core features'

const routes: RouteRecordRaw[] = [{
        path: 'tasks',
        component: () => import('./pages/TaskPage.vue'),
        meta: {
            title: 'Мои задачи',
            description: 'Список задач, инициированных мной на согласование, и назначенных мне',
            icon: 'fact_check'
        }
    },
    {
        path: 'my-requests',
        component: () => import('./pages/MyRequestsPage.vue'),
        meta: {
            title: 'Мои заявки',
            description: 'Заявки, направленные мной',
            icon: 'stars'
        }
    }
]

const widgets: IWidgetDefinition[] = [{
    name: 'Быстрый навигатор',
    description: 'Кнопки быстрых действий',
    imgUrl: 'https://picsum.photos/seed/seed13/80/60',
    component: () => 
        import('./widgets/QuickActionsWidget.vue')
}]

export {
    name,
    description, 
    routes,
    widgets,
}