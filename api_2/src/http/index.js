import express from 'express'
import { verify } from 'jsonwebtoken'
import middlewares from './middlewares'
import router from './routes/index'

const app = express()

/* JWT */
const secret = 'dz'

/* MIDDLEWARES  */
middlewares(app)

/* ROUTES */

const validateToken = ({authorization}) => {
  if (!authorization || authorization === undefined) {
    throw new Error('token not found')
  }

  verify(authorization, secret)
}

app.use((req, res, next) => {
  try {
    console.log(req.headers.authorization)
    validateToken(req.headers)
    return next()
  } catch (exception) {
    return res.json(exception.message)
  }
})

app.use('/', router)

export default app
