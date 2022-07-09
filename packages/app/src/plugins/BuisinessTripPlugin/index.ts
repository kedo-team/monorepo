import { IWidgetDefinition, IRouteRecord } from '../PluginManager'

const name = 'Buisiness trip'
const description = 'Request for buisiness trip'

const routes: IRouteRecord[] = [{
    path: 'request-buisiness-trip',
    component: () => import('./pages/RequestForBuisinessTripPage.vue'),
    meta: {
        title: 'Заявка на командировку',
        description: 'Будет создана заявка на вашу командировку, запущена на согласование и отправлено в кадровую службу. Статус заявки вы сможете отслеживать в виджетах или на странице "Мои заявления".',
        icon: 'work',
        role: 'app_user',
        isRequest: true
    }
}]

// const widgets: IWidgetDefinition[] = [{
//     name: 'Widget short name',
//     description: 'Widget long and detail description',
//     imgUrl: 'https://picsum.photos/seed/seed666/80/60',
//     component: () =>
//         import('./widgets/RequestForVacation.vue')
// }]

export {
    name,
    description,
    routes,
    // widgets,
}