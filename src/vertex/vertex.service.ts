import { systemMessage, userMessage } from '../utils/functions/chat.utils';
import {
  defaultMessage,
  location,
  project,
  toolCallsVertex,
  vertexModel,
} from '../utils/constants/constants.utils';
import { VertexAI } from '@google-cloud/vertexai';

export class VertexService {
  private vertexAIService: VertexAI;

  constructor() {
    this.vertexAIService = new VertexAI({
      project: project,
      location: location,
      googleAuthOptions: {
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY,
        },
      },
    });
  }

  async generateSummary(text: string): Promise<any> {
    return {
      data: await this.functionCall(vertexModel, text, toolCallsVertex),
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

  async functionCall(model: string, text: any, toolCalls: any): Promise<any> {
    const generativeModel = this.vertexAIService.getGenerativeModel({
      model: model,
    });

    const chat = generativeModel.startChat({
      tools: toolCalls,
    });

    await chat.sendMessage(defaultMessage);

    const result = await chat.sendMessage(text);

    return result.response.candidates[0].content.parts[0].functionCall.args;
  }
}
