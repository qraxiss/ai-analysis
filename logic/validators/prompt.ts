import * as Joi from 'joi'

export const createPrompt = Joi.object({
    text: Joi.string().required(),
    name: Joi.string().required(),
    variables: Joi.array().items(Joi.string())
})

export const updatePrompt = Joi.object({
    name: Joi.string().required(),
    prompt: Joi.object({
        name: Joi.string(),
        text: Joi.string()
    }).or('name', 'text')
})

export const deletePrompt = Joi.object({
    name: Joi.string().required()
})

export const getPrompt = Joi.object({
    name: Joi.string()
})

export const appendVariable = Joi.object({
    name: Joi.string().required(),
    variable: Joi.string().required()
})

export const removeVariable = Joi.object({
    name: Joi.string().required(),
    variable: Joi.string().required()
})
