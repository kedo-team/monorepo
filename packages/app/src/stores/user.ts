import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { GridStackOptions, GridStackWidget } from 'gridstack'
import  type Keycloak from 'keycloak-js'
import { keycloak } from '../boot/auth'

const _layoutLocalStorageKey = 'kedo/layout';

export const useUser = defineStore('userStore', {
  state: () => {
    return {
      isAuthenticated: false,
      firstName: '',
      lastName: '',
      avatarUrl: '',
      isLayoutInEditMode: false,
      _keycloak: keycloak
    }
  },

  getters: {
    jwt: (state) => {
      return state._keycloak?.token
    },
    id: (state) => {
      console.log('getting user id', state._keycloak.subject)
      return state._keycloak?.subject
    }
  },

  actions: {
    // async authenticate() {
    // },

    /**
     * Returns current layout.
     * Try load it from the localStorage first, if it empty loading it from a remote storage.
     */
    getLayout(): ILayout {
      // if current layout just return it
      if (this.layout)  return this.layout as ILayout;

      // try load it from local storage
      if (LocalStorage.has(_layoutLocalStorageKey)) {
        this.layout = LocalStorage.getItem<ILayout>(_layoutLocalStorageKey);
        if (this.layout) return this.layout as ILayout;
      }

      // the last chance is try load it from remote storage
      return [];
    },

    setLayout(layout: ILayout): void {
      // LocalStorage.set(_layoutLocalStorageKey, layou/// <reference path="" />t);
      // console.log('saved');
    }
  }
});

type ILayout = GridStackWidget[] | GridStackOptions;