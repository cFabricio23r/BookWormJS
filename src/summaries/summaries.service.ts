import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatSummaryDTO, StoreEditSummaryDTO } from '../utils/dto/utils.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require('pdf-parse');
import * as fs from 'fs';
import { OpenaiService } from '../openai/openai.service';
import { SummaryEntity } from '../utils/entity/utils.entity';
//import { VertexService } from '../vertex/vertex.service';

@Injectable()
export class SummariesService {
  constructor(
    private prisma: PrismaService,
    private openai: OpenaiService, //private vertexai: VertexService,
  ) {}

  async create(storeEditSummaryDTO: StoreEditSummaryDTO): Promise<any> {
    const fileBuffer = fs.readFileSync(
      `uploads/${storeEditSummaryDTO.file.filename}`,
    );
    const pdfFile = await pdfParse(fileBuffer);
    const result = await this.openai.generateSummary(pdfFile.text);

    const newSummary = await this.prisma.summary.create({
      data: {
        title: result?.data?.title,
        author: result.data.author,
        year: result.data.year,
        summary: result.data.summary,
        context: result.context,
        key_aspects: result.data.key_aspects,
        userId: storeEditSummaryDTO.userId,
      },
    });

    return {
      data: new SummaryEntity(newSummary),
      message: 'Summary created successfully',
      status: HttpStatus.CREATED,
    };
  }

  async chat(id: string, chatSummaryDTO: ChatSummaryDTO): Promise<any> {
    const summary = await this.prisma.summary.findUnique({
      where: {
        id: id,
      },
    });

    const result = await this.openai.chatSummary(
      chatSummaryDTO.question,
      summary.context,
    );

    return {
      data: {
        answer: result.data,
      },
      message: 'Chat answer created successfully',
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    const summaries = await this.prisma.summary.findMany();
    return {
      data: summaries.map((summary) => new SummaryEntity(summary)),
      message: 'Summaries retrieved successfully',
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const summary = await this.prisma.summary.findUnique({
      where: {
        id: id,
      },
    });
    return {
      data: new SummaryEntity(summary),
      message: 'Summary retrieved successfully',
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    await this.prisma.summary.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Summary deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
