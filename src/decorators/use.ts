/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'reflect-metadata'
import { RequestHandler } from 'express'
import { MetadataKeys } from '../enums'

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || []
    Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key)
  }
}
