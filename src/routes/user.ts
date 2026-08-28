import { Router } from 'express'
import * as middlewareAuth from '../middlewares/auth'
import * as controllerUser from '../controllers/user'

const router = Router()

router.patch('/cart', middlewareAuth.jwt, controllerUser.cart)

router.get('/cart', middlewareAuth.jwt, controllerUser.getCart)

router.get('/profile', middlewareAuth.jwt, controllerUser.getProfile)
router.patch('/profile', middlewareAuth.jwt, controllerUser.updateProfile)

export default router
