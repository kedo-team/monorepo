import { Injectable, Module } from '@nestjs/common'
import { PostGraphileController } from './postgraphile.controller'
import { postgraphile, PostGraphileOptions } from 'postgraphile'

import { ConfigService } from '@nestjs/config';
import { TestingModuleBuilder } from '@nestjs/testing';

@Injectable()
export class PostGraphileService {
    constructor(private config: ConfigService) {
        console.log('creating postgraphile');
        this.middleware = postgraphile(
            `postgres://${this.config.get("KEDO_API_USER_NAME")}:${this.config.get("KEDO_API_USER_PASSWORD")}@kt_db:${this.config.get("KEDO_DB_PORT_EXPOSE")}/${this.config.get("KEDO_DB_NAME")}`,
            this.config.get("KEDO_DB_PUBLIC_SCHEMA"),
            this.options);
        console.log('contructed middleware')
    }

    public middleware;

    private readonly options: PostGraphileOptions = {
        ownerConnectionString: `postgres://${this.config.get("KEDO_DB_ROOT_USER_NAME")}:${this.config.get("KEDO_DB_ROOT_USER_PASSWORD")}@kt_db:${this.config.get("KEDO_DB_PORT_EXPOSE")}/${this.config.get("KEDO_DB_NAME")}`,
        simpleCollections: "both",
        pgDefaultRole: "app_user",
        subscriptions: true,
        dynamicJson: true,
        watchPg: true,
        ignoreRBAC: false,
        extendedErrors: ["severity","code","detail","hint","position","internalPosition","internalQuery","where","schema","table","column","dataType","constraint","file","line","routine"],
        showErrorStack: "json",
        enhanceGraphiql: true,
        graphiql: true,
        allowExplain(req) {
            // TODO: customise condition!
            return true;
        },
        legacyRelations: 'omit',
        enableQueryBatching: true,
        // pgSettings(req) {
        //     /* TODO */
        // },
        enableCors: true,
        appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')]
        //   "--jwt-token-identifier", "${KEDO_DB_PUBLIC_SCHEMA}.jwt_token",
        //   "--jwt-secret", "${KEDO_JWT_SECRET}"
    }
}

// const options: PostGraphileOptions = {
//     ownerConnectionString: `postgres://${process.env.KEDO_DB_ROOT_USER_NAME}:${process.env.KEDO_DB_ROOT_USER_PASSWORD}@kt_db:${process.env.KEDO_DB_PORT_EXPOSE}/${process.env.KEDO_DB_NAME}`,
//     simpleCollections: "both",
//     pgDefaultRole: "app_user",
//     subscriptions: true,
//     dynamicJson: true,
//     watchPg: true,
//     ignoreRBAC: false,
//     extendedErrors: ["severity","code","detail","hint","position","internalPosition","internalQuery","where","schema","table","column","dataType","constraint","file","line","routine"],
//     showErrorStack: "json",
//     enhanceGraphiql: true,
//     graphiql: true,
//     allowExplain(req) {
//         // TODO: customise condition!
//         return true;
//     },
//     legacyRelations: 'omit',
//     enableQueryBatching: true,
//     // pgSettings(req) {
//     //     /* TODO */
//     // },
//     enableCors: true,
//     appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')]
//     //   "--jwt-token-identifier", "${KEDO_DB_PUBLIC_SCHEMA}.jwt_token",
//     //   "--jwt-secret", "${KEDO_JWT_SECRET}"
// }

// console.log(process.env.KEDO_DB_PUBLIC_SCHEMA)
// export const middleware = postgraphile(
//     `postgres://${process.env.KEDO_API_USER_NAME}:${process.env.KEDO_API_USER_PASSWORD}@kt_db:${process.env.KEDO_DB_PORT_EXPOSE}/${process.env.KEDO_DB_NAME}`,
//     process.env.KEDO_DB_PUBLIC_SCHEMA,
//     options
// )
