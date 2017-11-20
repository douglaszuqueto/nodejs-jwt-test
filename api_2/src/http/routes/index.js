import { Router } from 'express'

/* ROUTES */
const router = Router()

const user = {
  username: 'douglaszuqueto',
  password: 'admin'
}

router.get('/user', async (req, res) => {
  try {
    return res.json(user)
  } catch (exception) {
    return res.json(exception.message)
  }
})

export default router
