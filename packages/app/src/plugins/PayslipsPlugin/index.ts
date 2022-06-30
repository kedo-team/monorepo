import { IWidgetDefinition, IRouteRecord } from '../PluginManager'

const name = 'Pay slips plugin'
const description = 'Contains items to work with Payslips'

const widgets: IWidgetDefinition[] = [
{
    name: 'Расчетные листки',
    description: 'Информация о начислениях заработной платы',
    imgUrl: 'https://picsum.photos/seed/seed14/80/60',
    component: () => 
        import('./widgets/PaySlipsWidget.vue')
}]

const routes: IRouteRecord[] = [{
    path: 'payslips',
    component: () => import('./pages/PayslipsPage.vue'),
    meta: {
        title: 'Расчетные листки',
        description: 'Информация о всех начислениях зарплаты за любой период',
        icon: 'currency_ruble'
    }
}]


export {
    name,
    description, 
    routes,
    widgets,
}