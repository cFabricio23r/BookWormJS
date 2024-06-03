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
