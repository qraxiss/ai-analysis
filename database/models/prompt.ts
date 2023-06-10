import { prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose'

@modelOptions({})
export class Prompt {
    @prop({ required: true, type: String })
    text!: string

    @prop({ required: true, unique: true, type: String })
    name!: string

    @prop({ type: Array, items: String, default: [] })
    variables?: string[]
}

export const PromptModel = getModelForClass(Prompt)
