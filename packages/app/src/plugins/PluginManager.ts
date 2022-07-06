import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import  LoadingComponent from '../components/LoadingComponent.vue'
import  ErrorWidget from '../components/ErrorWidget.vue'
import cfg from 'src/config'
import { route } from 'quasar/wrappers'
import { IUserRole } from '@kedo-team/data-model'

const plugins = cfg.plugins


const widgets: IWidget[] = []

const modulePromises: Promise<IPluginDefinition>[] = [
    import('src/plugins/CorePlugin'),
    import('src/plugins/PayslipsPlugin'),
    import('src/plugins/RequestForVacationPlugin'),
    import('src/plugins/CertificatesPlugin'),
    import('src/plugins/LnaPlugin'),
    import('src/plugins/CompanyStructurePlugin'),
    import('src/plugins/ApprovementEditorPlugin'),
    import('src/plugins/BuisinessTripPlugin')
]
// plugins.map(path => import(path))

const routesPromise = new Promise<IRouteRecord[]>((resolve, reject) => {
    Promise.all(modulePromises)
    .then(modules => {
        const allRoutes: IRouteRecord[] = []
        modules.forEach((m) => {
            if (m.routes)
                allRoutes.push(...m.routes)
        })
        resolve(allRoutes)
    })
})

const widgetPromise = new Promise<IWidgetDefinition[]>((resolve, reject)=>{
    Promise.all(modulePromises)
    .then(modules => {
        const allWidgets: IWidgetDefinition[] = []
        modules.forEach( (m) => {
            if (m.widgets)
               allWidgets.push(...m.widgets)
        })
        resolve(allWidgets)
    })
})


export async function getWidgetList() : Promise<IWidgetDefinition[]> {
    return widgetPromise;
}

export async function getRoutes(): Promise<IRouteRecord[]> {
    return routesPromise;
}

export interface IWidgetDefinition {
    name: string,
    description: string,
    imgUrl: string,
    component: () => Promise<typeof import('*.vue')>
}

export interface IWidget extends Omit<IWidgetDefinition, 'component'>{
    component: ReturnType<typeof defineAsyncComponent>
}

export interface IPluginDefinition {
    name: string,
    description: string,
    routes?: IRouteRecord[],
    widgets?: IWidgetDefinition[]
}

export type IRouteRecord = RouteRecordRaw & {
    meta: {
        title?: string
        description?: string
        icon?: string,
        role: IUserRole
    }
}