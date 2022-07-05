import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import  LoadingComponent from '../components/LoadingComponent.vue'
import  ErrorWidget from '../components/ErrorWidget.vue'
import cfg from 'src/config'
import { route } from 'quasar/wrappers'
import { IUserRole } from '@kedo-team/data-model'

const plugins = cfg.plugins


const widgets: IWidget[] = []

const modulePromises = plugins.map(path => import(path))

const routesPromise = new Promise<IRouteRecord[]>((resolve, reject) => {
    Promise.all(modulePromises)
    .then(modules => {
        const allRoutes: IRouteRecord[] = []
        modules.forEach(m => {
            if (m.routes)
                allRoutes.push(...m.routes)
        })
        resolve(allRoutes)
    })
})


// Promise.all(plugins.map(path => {
//     // here the sample from vite for inspiration
//     // https://vitejs.dev/guide/features.html#glob-import
//     return (() => import(/* @vite-ignore */path))()
// })).then(modules => {
//     modules.forEach(m => {
//         if (m.routes) {
//             routes.push(...m.routes)
//         }

//         if (m.widgets) {
//             const widgetDefinition = m.widgets.map((w: IWidgetDefinition) => { return {
//                 name: w.name,
//                 description: w.description,
//                 imgUrl: w.imgUrl,
//                 component: defineAsyncComponent({
//                     loader: w.component,
//                     loadingComponent: LoadingComponent,
//                     errorComponent: ErrorWidget
//                 })
//             }})

//             widgets.push(...widgetDefinition)
//         }
//     })
// })

export function getWidgetList() : IWidget[] {
    return widgets;
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
    routes: RouteRecordRaw[],
    widgets: IWidgetDefinition[]
}

export type IRouteRecord = RouteRecordRaw & {
    meta: {
        title?: string
        description?: string
        icon?: string,
        role: IUserRole
    }
}