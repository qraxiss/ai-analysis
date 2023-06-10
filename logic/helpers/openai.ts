import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai'
import { ChatGPTError } from '../../errors/errors'

import config from '../../config'

const configuration = new Configuration({
    apiKey: config.OPENAI
})
const openai = new OpenAIApi(configuration)

export async function getAiAnswer(messages: ChatCompletionRequestMessage[], temperature: number) {
    try {
        var completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: temperature
        })
    } catch (e: any) {
        throw new ChatGPTError(e.response.data.error.message)
    }

    const result = completion.data.choices[0].message

    if (!result) {
        throw new ChatGPTError('No response from AI')
    }

    return result
}
