import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";
import {IChatResponse} from "../utils/interface/utils.interface";
import * as process from "node:process";

export class OpenaiService {
    private openAIService: OpenAI;

    constructor() {
        this.openAIService = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateSummary(text: string): Promise<any> {

        return this.chatOpenAI(
            'gpt-3.5-turbo',
            [
                this.systemMessage('Perform function requests for the user following the instructions below'),
                ...(text && [this.userMessage(text)])
            ],
            {
                name: 'book_summary',
                description: 'Get a full detailed insight of book provided by the user',
                parameters: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: "Book's title"
                        },
                        author: {
                            type: 'string',
                            description: "Book's author"
                        },
                        year: {
                            type: 'string',
                            description: "Book's publication year"
                        },
                        key_aspects: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    aspect: {
                                        type: 'string',
                                        description: 'Provide a title of each key aspect'
                                    },
                                    page: {
                                        type: 'string',
                                        description: 'The page number where each key aspect was found'
                                    },
                                    description: {
                                        type: 'string',
                                        description: 'Provide a comprehensive analysis of each key aspect provided, text must be at least 100 words'
                                    }
                                },
                                required: ['aspect', 'page', 'description']
                            },
                            description: "List of five key aspects of the book avoiding the pages that may be or contains the following: cover, abstract, bibliography, table of contents, references, index and another information which is not part of the book's content itself"
                        },
                        summary: {
                            type: 'string',
                            description: 'Provide a summary of the book, text must be at least 500 words'
                        }
                    },
                    required: ['title', 'author', 'year', 'key_aspects', 'summary']
                }
            }
        )
    }

    async chatOpenAI(model: string, messages, tool_calls ): Promise<any> {

        const options = {
            model: model,
            tool_calls: tool_calls,
            messages: messages
        };

        const results = await this.openAIService.chat.completions.create(options);

        return this.getChatOpenaiResponse(results);
    }

    getChatOpenaiResponse(message: OpenAI.ChatCompletion): IChatResponse {
        return {
            success: true,
            result: message.choices[0].message.tool_calls.entries()
        };
    }

    generateMessage(role: string, content: string) {
        return {
            role: role,
            content: content
        }
    }

    assistantMessage(content: string) {
        return this.generateMessage('system', content);
    }

    systemMessage(content: string) {
        return this.generateMessage('user', content);
    }

    userMessage(content: string) {
        return this.generateMessage('user', content);
    }


}
