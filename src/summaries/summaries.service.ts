import {HttpStatus, Injectable} from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import {StoreEditSummaryDTO} from "../utils/dto/utils.dto";
const pdfParse = require('pdf-parse');
import * as fs from 'fs'
import {OpenaiService} from "../openai/openai.service";

@Injectable()
export class SummariesService {
    constructor(
        private prisma: PrismaService,
        private openai: OpenaiService
    ) {}

    async create(storeEditSummaryDTO: StoreEditSummaryDTO): Promise<any> {

        const fileBuffer = fs.readFileSync(`uploads/${storeEditSummaryDTO.file.filename}`);

        const pdfFile = await pdfParse(fileBuffer);

        const result = this.openai.generateSummary(pdfFile.text);



        /*const newSummary = await this.prisma.summary.create({
            data: {
                title: 'title',
                author: 'author',
                year: 'year',
                summary: 'summary',
                context: 'context',
                key_aspects: 'key_aspects',
            }
        });*/

        return {
            data: 'file.originalname',
            message: "Summary created successfully",
            status: HttpStatus.CREATED
        }
    }

    async findAll() {

    }

    async findOne(id: number) {

    }

    async remove(id: number) {

    }

    async generateSummary() {

    }
}
