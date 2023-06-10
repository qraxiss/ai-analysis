import * as Joi from 'joi'

export const openai = Joi.object({
    content: Joi.string().required(),
    prompt: Joi.string().required(),
    model: Joi.string().default('gpt-3.5-turbo'),
    temperature: Joi.number().default(0.5),

    // allow all fields
    variables: Joi.any()
})
