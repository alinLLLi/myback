import { Router } from 'express'
import * as controllerKnowledge from '../controllers/knowledge'
import * as middlewareAuth from '../middlewares/auth'
import middlewareUpload from '../middlewares/upload'

const router = Router()

router.post(
  '/',
  middlewareAuth.jwt,
  middlewareAuth.admin,
  middlewareUpload,
  controllerKnowledge.create,
)

router.patch(
  '/:id',
  middlewareAuth.jwt,
  middlewareAuth.admin,
  middlewareUpload,
  controllerKnowledge.update,
)

router.delete('/:id', middlewareAuth.jwt, middlewareAuth.admin, controllerKnowledge.remove)

router.get('/', controllerKnowledge.get)
router.get('/all', middlewareAuth.jwt, middlewareAuth.admin, controllerKnowledge.getAll)
router.get('/:id', controllerKnowledge.getId)

export default router
