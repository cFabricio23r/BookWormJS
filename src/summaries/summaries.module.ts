import { Module } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { SummariesController } from './summaries.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OpenaiService } from '../openai/openai.service';

@Module({
  controllers: [SummariesController],
  providers: [SummariesService, OpenaiService],
  imports: [PrismaModule],
  exports: [SummariesService],
})
export class SummariesModule {}
