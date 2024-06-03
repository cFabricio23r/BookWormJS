import { Module } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { SummariesController } from './summaries.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OpenaiService } from '../openai/openai.service';
import { VertexService } from '../vertex/vertex.service';

@Module({
  controllers: [SummariesController],
  providers: [SummariesService, OpenaiService, VertexService],
  imports: [PrismaModule],
  exports: [SummariesService],
})
export class SummariesModule {}
