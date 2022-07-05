import { IAuthProvider } from './interfaces'
import KeyCloak from 'keycloak-js'

interface IOIDCInitOptions {
  url: string
  realm: string
  clientId: string
}

export class KeyCloakAuthProvider implements IAuthProvider {
  private keycloak: KeyCloak;
  constructor(private config: IOIDCInitOptions) {
    this.keycloak = new KeyCloak(config)
  }

  async init() {
    // https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter
    // https://www.keycloak.org/securing-apps/vue

    const auth =  await this.keycloak.init({
      onLoad: 'login-required'
    })
    return;
  }
  getJwt(): string {
    return this.keycloak.token
  }
  getSubject(): string {
    return this.keycloak.subject
  }

}