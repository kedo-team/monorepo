import { Module } from '@nestjs/common'
import { PostGraphileController } from './postgraphile.controller'
import { postgraphile, PostGraphileOptions } from 'postgraphile'

import { ConfigService } from '@nestjs/config';
import { TestingModuleBuilder } from '@nestjs/testing';



const options: PostGraphileOptions = {
    ownerConnectionString: `postgres://${process.env.KEDO_DB_ROOT_USER_NAME}:${process.env.KEDO_DB_ROOT_USER_PASSWORD}@${process.env.KEDO_DB_HOST}:${process.env.KEDO_DB_PORT_EXPOSE}/${process.env.KEDO_DB_NAME}`,
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

export const middleware = postgraphile(
    `postgres://${process.env.KEDO_API_USER_NAME}:${process.env.KEDO_API_USER_PASSWORD}@${process.env.KEDO_DB_HOST}:${process.env.KEDO_DB_PORT_EXPOSE}/${process.env.KEDO_DB_NAME}`,
    process.env.KEDO_DB_PUBLIC_SCHEMA,
    options
)
