import { Router } from 'express'

//Require controllers
import { Prompt } from '../controllers/prompt'
//Initilaziation
const router = Router()

//Routes

router.post('/', Prompt.create)
router.patch('/', Prompt.update)
router.delete('/', Prompt.delete)
router.get('/', Prompt.get)

const variableRouter = Router()

variableRouter.post('/', Prompt.appendVariable)
variableRouter.delete('/', Prompt.removeVariable)

router.use('/variable', variableRouter)

export { router }
