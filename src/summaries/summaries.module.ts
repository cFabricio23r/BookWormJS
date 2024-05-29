import { Module } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { SummariesController } from './summaries.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [SummariesController],
  providers: [SummariesService],
  imports: [PrismaModule],
  exports: [SummariesService],
})
export class SummariesModule {}
