import * as validator from '../validators/prompt'
import { validate } from '../helpers/validator'
import * as types from '../types'

import { Prompt, PromptModel } from '../../database/models/prompt'

export async function createPrompt(params: any) {
    const value = validate(params, validator.createPrompt) as types.createPrompt
    const result = await PromptModel.create(value)

    if (!result) {
        throw new Error('Failed to create prompt')
    }

    return result
}

export async function updatePrompt(params: any) {
    const value = validate(params, validator.updatePrompt) as types.updatePrompt
    const result = await PromptModel.updateOne({ name: value.name }, value.prompt)

    if (result.matchedCount === 0) {
        throw new Error('Prompt not found!')
    }

    return result.modifiedCount > 0
}

export async function deletePrompt(params: any) {
    const value = validate(params, validator.deletePrompt) as types.deletePrompt
    const result = await PromptModel.deleteOne({ name: value.name })

    return result.deletedCount > 0
}

export async function getPrompt(params: any) {
    const value = validate(params, validator.getPrompt) as types.getPrompt
    const result = await PromptModel.find(value)

    if (result.length === 0) {
        throw new Error('Prompt not found!')
    }

    return result as Prompt[]
}

export async function appendVariable(params: any) {
    const value = validate(params, validator.appendVariable) as types.appendVariable

    //insert variable to prompt.variables
    const result = await PromptModel.updateOne({ name: value.name }, { $addToSet: { variables: value.variable } })

    if (result.matchedCount === 0) {
        throw new Error('Prompt not found!')
    }

    return result.modifiedCount > 0
}

export async function removeVariable(params: any) {
    const value = validate(params, validator.removeVariable) as types.removeVariable

    //remove variable from prompt.variables
    const result = await PromptModel.updateOne({ name: value.name }, { $pull: { variables: value.variable } })

    if (result.matchedCount === 0) {
        throw new Error('Prompt not found!')
    }

    return result.modifiedCount > 0
}
