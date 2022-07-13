import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'

export default boot(async ({ app }) => {
    // docs: https://vitejs.dev/guide/features.html#glob-import
    const componentModules = import.meta.glob('src/components/global/*.vue')
    const regExp = /.*\/(\w+).vue/i
    for (const path in componentModules) {
        const matches = regExp.exec(path)
        if (matches[1]) {
            const cmpName = matches[1]
            // docs: https://vuejs.org/guide/components/async.html#basic-usage
            app.component(`KT-${cmpName}`,
                         defineAsyncComponent(componentModules[path]))
        }
    }
})
