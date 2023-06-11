import * as validator from '../validators/openai'
import { validate } from '../helpers/validator'
import * as types from '../types'

import { PromptModel, Prompt } from '../../database/models/prompt'

import { getAiAnswer } from '../helpers/openai'

import { ChatCompletionRequestMessage } from 'openai'

import Joi from 'joi'

export async function getAiResponse(params: any) {
    const value = validate(params, validator.openai) as types.openai

    const prompt = (await PromptModel.findOne({ name: value.prompt })) as Prompt

    if (prompt.variables && value.variables) {
        const temp_obj: any = {}
        prompt.variables.forEach((variable) => {
            temp_obj[variable] = Joi.string().required()
        })
        const temp_schema = Joi.object(temp_obj)

        var variables = validate(value.variables, temp_schema)

        prompt.variables.forEach((variable) => {
            prompt.text = prompt.text.replace('{$_var_}'.replace('_var_', variable), variables[variable])
        })
    }

    const messages = [
        {
            content: prompt.text,
            role: 'system'
        },
        {
            content: value.content,
            role: 'user'
        }
    ] as ChatCompletionRequestMessage[]

    return await getAiAnswer(messages, value.temperature!, value.model!)
}
