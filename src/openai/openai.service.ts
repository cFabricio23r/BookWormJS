import OpenAI from 'openai';
import * as process from 'node:process';
import { systemMessage, userMessage } from '../utils/functions/chat.utils';
import { defaultMessage, toolCalls } from '../utils/constants/chat.utils';
import { RunnableToolFunction } from 'openai/lib/RunnableFunction';

export class OpenaiService {
  private openAIService: OpenAI;

  constructor() {
    this.openAIService = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateSummary(text: string): Promise<any> {
    return {
      data: await this.functionCall(
        'gpt-3.5-turbo',
        text ? [systemMessage(defaultMessage), userMessage(text)] : [],
        toolCalls,
      ),
      context: [systemMessage(defaultMessage), userMessage(text)],
    };
  }

  async chatSummary(question: string, context: any): Promise<any> {
    return {
      data: await this.chatCompletion([...context, userMessage(question)]),
      context: [...context, userMessage(question)],
    };
  }

  async chatCompletion(messages: any): Promise<any> {
    const chatCompletion = await this.openAIService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    return chatCompletion.choices[0]?.message?.content;
  }

  async functionCall(
    model: string,
    messages: any,
    toolCalls: RunnableToolFunction<any>[],
  ): Promise<any> {
    const [runner] = await Promise.all([
      this.openAIService.beta.chat.completions.runTools({
        model,
        tools: toolCalls,
        messages: [...messages],
      }),
    ]);

    return JSON.parse((await runner.finalFunctionCall()).arguments);
  }
}
