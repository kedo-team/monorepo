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
}]

export {
    name,
    description,
    routes,
}