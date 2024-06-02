import { Module } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { SummariesController } from './summaries.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {OpenaiService} from "../openai/openai.service";

@Module({
  controllers: [SummariesController],
  providers: [SummariesService],
  imports: [PrismaModule,OpenaiService],
  exports: [SummariesService],
})
export class SummariesModule {}
