/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string,
  readonly VITE_APP_TITLE: string,
  readonly VITE_CREATE_REQUEST_ENDPOINT_URL: string,
  readonly VITE_OIDC_URL: string,
  readonly VITE_OIDC_URL_REALM: string,
  readonly VITE_OIDC_CLIENT_ID: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
