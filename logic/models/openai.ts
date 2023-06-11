import * as validator from '../validators/openai'
import { validate } from '../helpers/validator'
import * as types from '../types'

import { PromptModel, Prompt } from '../../database/models/prompt'

import { getAiAnswer } from '../helpers/openai'

import { ChatCompletionRequestMessage } from 'openai'

import Joi from 'joi'

function dynamicValidator(variables: string[], reqVariables: any) {
    const temp_obj: any = {}
    variables.forEach((variable) => {
        temp_obj[variable] = Joi.string().required()
    })
    const tempValidator = Joi.object(temp_obj)

    return validate(reqVariables, tempValidator)
}

function variableReplacer(prompt: string, variables: any) {
    Object.keys(variables).forEach((variable) => {
        prompt = prompt.replace('{$_var_}'.replace('_var_', variable), variables[variable])
    })
    return prompt
}

function contentToChatCompletionRequestMessage(content: string, role: string) {
    return {
        content: content,
        role: role
    } as ChatCompletionRequestMessage
}

export async function getAiResponse(params: any) {
    const value = validate(params, validator.openai) as types.openai

    // get the default prompt from the database
    const prompt = (await PromptModel.findOne({ name: value.prompt })) as Prompt

    // if variables are present, validate them and replace them in the prompt
    if (prompt.variables && value.variables) {
        const variables = dynamicValidator(prompt.variables, value.variables)
        prompt.text = variableReplacer(prompt.text, variables)
    }

    const messages = [contentToChatCompletionRequestMessage(prompt.text, 'system')]

    // if history is present, add it to the messages
    if (value.history) {
        value.history.forEach((message: any) => {
            messages.push(contentToChatCompletionRequestMessage(message.content, message.role))
        })
    } else if (value.content) {
        messages.push(contentToChatCompletionRequestMessage(value.content, 'user'))
    }

    return await getAiAnswer(messages, value.temperature!, value.model!)
}
