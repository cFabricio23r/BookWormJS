import OpenAI from 'openai';

export interface IChatRequest {
    message: OpenAI.Chat.ChatCompletionMessage[];
}

export interface IChatResponse {
    success: boolean;
    result: OpenAI.ChatCompletion.Choice;
}