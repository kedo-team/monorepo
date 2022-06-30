import { boot } from 'quasar/wrappers'
// import { useUser } from '../stores/user'

// export default boot(({ router, store }) => {
//     console.log('in the boot')
//     const user = useUser()
//     if (user.isAuthenticated === false) {
//         user.authenticate();
//     }
//     // router.beforeEach((to, from, next) => {
//     //     // auth logic
//     // })
//     // store.init();
//     // return Promise.reject({url: '/login'})
// })


import KeyCloak from 'keycloak-js'

const initOptions = {
    url:      import.meta.env.VITE_OIDC_URL,
    realm:    import.meta.env.VITE_OIDC_URL_REALM,
    clientId: import.meta.env.VITE_OIDC_CLIENT_ID
}

const keycloak = new KeyCloak(initOptions);

export default boot(async ({app}) => {
    // https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter
    // https://www.keycloak.org/securing-apps/vue

    const auth = await keycloak.init({
                    onLoad: 'login-required'
                })
    
    if (!auth) {
        // TODO: do something meeninfull with it
        alert('failed!')
    } 
})

export { keycloak }