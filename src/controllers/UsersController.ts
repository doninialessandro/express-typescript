/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from 'express'

import { controller, bodyValidator, get, post } from '../decorators'
import { fakeData } from '../fakeDB/fakeData.js'

@controller('/users')
class UsersController {
  @get('/')
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllUsers = fakeData.users
      res.status(200).json({ data: findAllUsers, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  @post('/')
  @bodyValidator('id', 'name')
  async addUsers(req: Request, res: Response, next: NextFunction) {
    const { id, name } = req.body
    try {
      fakeData.users.push({ id, name })
      res.status(200).json({ data: fakeData.users, message: 'created' })
    } catch (error) {
      next(error)
    }
  }
}
