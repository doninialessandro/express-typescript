import express from 'express'
import connection from './startup/connection'
import routes from './startup/routes'

const app = express()
const port = process.env.PORT || '5000'

routes(app)
connection(app, port)
