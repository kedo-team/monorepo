import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
        realm: 'kedo-team',
        authServerUrl: 'http://127.0.0.1:8080/',
        clientId: 'kedo-api-proxy',
        "ssl-required": "external",
        "resource": "kedo-api-proxy",
        secret: 'asd',
        // publiClient: true,
        // "confidentialPort": 0,      
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.NONE,


    
    
    };
  }  
}