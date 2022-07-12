import cfg from 'src/config'
import { IRouteRecord, IWidgetDefinition } from '../PluginManager'

const name = 'Core Plugin'
const description = 'core features'

const routes: IRouteRecord[] = [{
        path: 'tasks',
        component: () => import('./pages/TaskPage.vue'),
        meta: {
            title: 'Мне на согласование',
            description: 'Заявки сотрудников, требующие моего согласования',
            icon: 'fact_check',
            role: 'app_head',
            count: cfg.providers.userTask.getCount
        }
    },
    {
        path: 'my-requests',
        component: () => import('./pages/MyRequestsPage.vue'),
        meta: {
            title: 'Мои заявки',
            description: 'Заявки, направленные мной',
            icon: 'stars',
            role: 'app_user',
            isRequest: true
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
},
{
    name: 'Календарь подразделения',
    description: 'Отпуска и командировки сотрудников моего подразделения',
    imgUrl: 'https://picsum.photos/seed/seed13/80/60',
    component: () =>
        import('./widgets/OrgScheduleWidget.vue')
}]

export {
    name,
    description,
    routes,
    widgets,
}