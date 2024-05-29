import {
  Body,
  Controller, Delete, Get, Param, ParseIntPipe,
  Post, UseGuards,
} from '@nestjs/common';
import { SummariesService } from './summaries.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ResponseEntity} from "../utils/entity/utils.entity";
import {StoreEditSummaryDTO} from "../utils/dto/utils.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('summaries')
@ApiTags('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ResponseEntity })
  async create(@Body() createSummaryDto: StoreEditSummaryDTO): Promise<ResponseEntity> {
    return this.summariesService.create(createSummaryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseEntity })
  async findAll() {
    return this.summariesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.summariesService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.summariesService.remove(id);
  }
}
