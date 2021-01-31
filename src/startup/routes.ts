import { Express } from 'express'
import bodyParser from 'body-parser'
import { AppRouter } from '../utils/AppRouter'

import '../controllers/UsersController'

export default (app: Express): void => {
  app.use(bodyParser.json())

  // APIs routes
  app.use(AppRouter.getInstance())
}
