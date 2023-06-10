import { ahandler } from '../../errors/handle'
import * as promptLogic from '../../logic/models/prompt'

export class Prompt {
    @ahandler
    static async create(req: any, res: any, next: any) {
        return res.json(await promptLogic.createPrompt(req.body))
    }

    @ahandler
    static async update(req: any, res: any, next: any) {
        return res.json(await promptLogic.updatePrompt(req.body))
    }

    @ahandler
    static async delete(req: any, res: any, next: any) {
        return res.json(await promptLogic.deletePrompt(req.body))
    }

    @ahandler
    static async get(req: any, res: any, next: any) {
        return res.json(await promptLogic.getPrompt(req.body))
    }

    @ahandler
    static async appendVariable(req: any, res: any, next: any) {
        return res.json(await promptLogic.appendVariable(req.body))
    }

    @ahandler
    static async removeVariable(req: any, res: any, next: any) {
        return res.json(await promptLogic.removeVariable(req.body))
    }
}
