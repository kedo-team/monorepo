import { boot } from 'quasar/wrappers'
import cfg from 'src/config'

export default boot(async () => {
    return await cfg.providers.auth.init()
})
