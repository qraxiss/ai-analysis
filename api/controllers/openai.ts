import { ahandler } from '../../errors/handle'
import * as openaiLogic from '../../logic/models/openai'

export class OpenAI {
    @ahandler
    static async post(req: any, res: any, next: any) {
        return res.json(await openaiLogic.getAiResponse(req.body))
    }
}
