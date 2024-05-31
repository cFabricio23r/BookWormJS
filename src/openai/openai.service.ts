import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OpenaiService {
    /*private openAIService: OpenAI;

    constructor(private configService: ConfigService) {
        this.openAIService = new OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }*/


}
