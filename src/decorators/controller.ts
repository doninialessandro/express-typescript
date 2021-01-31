/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'reflect-metadata'
import { Request, Response, RequestHandler, NextFunction } from 'express'

import { Methods, MetadataKeys } from '../enums'
import { AppRouter } from '../utils/AppRouter'

function bodyValidator(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Unprocessable Entity')
      return
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property: ${key}`)
        return
      }
    }

    next()
  }
}

export function controller(routePrefix: string) {
  return function name(target: Function) {
    const router = AppRouter.getInstance()

    for (const key in target.prototype) {
      const routeHandler = target.prototype[key]
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key)
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || []
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []

      const validator = bodyValidator(requiredBodyProps)

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
      }
    }
  }
}
