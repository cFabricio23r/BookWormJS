import { Module } from '@nestjs/common';
import { VertexService } from './vertex.service';

@Module({
  providers: [VertexService],
})
export class VertexModule {}
