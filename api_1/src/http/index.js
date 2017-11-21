import express from 'express'
import jwt from 'jsonwebtoken'
import middlewares from './middlewares'
import router from './routes/index'
import { default as IndexController } from './controller'

const app = express()

/* JWT */
const secret = 'dz'

/* MIDDLEWARES  */
middlewares(app)

/* ROUTES */

app
  .get('/', async (...args) => IndexController.all(...args))
  .get('/:id', async (...args) => IndexController.get(...args))
  .post('/', async (...args) => IndexController.create(...args))

app.post('/auth', async (req, res) => {
  try {
    const {username, password} = req.body
    const token = jwt.sign({
      data: {username, password}
    }, secret, {expiresIn: '1h'})
    return res.json(token)
  } catch (exception) {
    return res.json(exception.message)
  }
})

const validateToken = ({authorization}) => {
  if (!authorization || authorization === undefined) {
    throw new Error('token not found')
  }

  jwt.verify(authorization, secret)
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
