import express from 'express'
import jwt from 'jsonwebtoken'
import middlewares from './middlewares'
import router from './routes/index'

const app = express()

/* JWT */
const secret = 'dz'

/* MIDDLEWARES  */
middlewares(app)

/* ROUTES */

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
