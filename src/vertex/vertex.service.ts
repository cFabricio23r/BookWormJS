import { systemMessage, userMessage } from '../utils/functions/chat.utils';
import {
  defaultMessage,
  location,
  project,
  toolCalls,
  vertexModel,
} from '../utils/constants/constants.utils';
import { RunnableToolFunction } from 'openai/lib/RunnableFunction';
import { VertexAI } from '@google-cloud/vertexai';

export class VertexService {
  private vertexAIService: VertexAI;

  constructor() {
    this.vertexAIService = new VertexAI({
      project: project,
      location: location,
    });
  }

  async generateSummary(text: string): Promise<any> {
    return {
      data: await this.functionCall(
        vertexModel,
        text,
        toolCalls,
      ),
      context: [systemMessage(defaultMessage), userMessage(text)],
    };
  }

  /*async chatSummary(question: string, context: any): Promise<any> {
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
  }*/

  async functionCall(
    model: string,
    text: any,
    toolCalls: any,
  ): Promise<any> {
    const generativeModel = this.vertexAIService.getGenerativeModel({
      model: model,
    });

    const chat = generativeModel.startChat({
      tools: toolCalls,
      systemInstruction: defaultMessage,
    });

    const result = await chat.sendMessage([
      {
        text: defaultMessage,
      },
      {
        text: text
      }
    ]);

    console.log(result.response);

    return result.response;
  }
}
