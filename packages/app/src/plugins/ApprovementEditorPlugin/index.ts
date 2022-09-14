import { IWidgetDefinition, IRouteRecord } from '../PluginManager'

const name = 'Approvement editor plugin'
const description = 'You can view and edit approvement list'

const routes: IRouteRecord[] = [{
    path: '/approvement-editor',
    component: () => import('./pages/ApprovementEditorPage.vue'),
    meta: {
        title: 'БП согласований',
        description: 'Редактирование БП согласования заявок для всех доступных кадровых БП',
        icon: 'self_improvement',
        role: 'app_admin'
    }
},
{
    path: '/approvement-stats',
    component: () => import('./pages/ApprovementStatsPage.vue'),
    meta: {
        title: 'Статистика согласований',
        description: 'Позволяет контролировать своевременное подписание сотрудниками направленных им документов',
        icon: 'self_improvement',
        role: 'app_admin'
    }
},

]

export {
    name,
    description,
    routes,
}