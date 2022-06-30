import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import  LoadingComponent from '../components/LoadingComponent.vue'
import  ErrorWidget from '../components/ErrorWidget.vue'
import plugins from './config'

// here the sample from vite for inspiration
// https://vitejs.dev/guide/features.html#glob-import
const modules = await Promise.all(plugins.map(path => {
    return (() => import(/* @vite-ignore */path))()
}))

const routes: IRouteRecord[] = [];
const widgets: IWidget[] = [];

modules.forEach(m => {
    if (m.routes) {
        routes.push(...m.routes)
    }

    if (m.widgets) {
        const widgetDefinition = m.widgets.map((w: IWidgetDefinition) => { return {
            name: w.name,
            description: w.description,
            imgUrl: w.imgUrl,
            component: defineAsyncComponent({
                loader: w.component,
                loadingComponent: LoadingComponent,
                errorComponent: ErrorWidget
            })
        }})

        widgets.push(...widgetDefinition)
    }    
})

export function getWidgetList() : IWidget[] {
    return widgets;
}

export function getRoutes(): IRouteRecord[] {
    return routes;
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
        icon?: string
    }
}