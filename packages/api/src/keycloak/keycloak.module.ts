import { KeycloakConnectModule, PolicyEnforcementMode, TokenValidation} from 'nest-keycloak-connect'

KeycloakConnectModule.register('./keycloak.json', {
    policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
    tokenValidation: TokenValidation.ONLINE, // optional
 })