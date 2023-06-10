import { Router } from 'express'

//Require controllers
import { OpenAI } from '../controllers/openai'

//Initilaziation
const router = Router()

router.post('/', OpenAI.post)

export { router }
