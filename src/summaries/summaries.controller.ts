import {
  Body,
  Controller, Delete, Get, Param, ParseFilePipe, ParseIntPipe,
  Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { SummariesService } from './summaries.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ResponseEntity} from "../utils/entity/utils.entity";
import {StoreEditSummaryDTO} from "../utils/dto/utils.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, pdfFileFilter} from "../utils/file/file.utils";

@Controller('summaries')
@ApiTags('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    }),
    fileFilter: pdfFileFilter
  }))
  @ApiCreatedResponse({ type: ResponseEntity })
  async create(
    @UploadedFile()
    file: Express.Multer.File,
    @Body()
    storeEditSummaryDTO: StoreEditSummaryDTO
  ): Promise<ResponseEntity> {
    storeEditSummaryDTO.file = file;
    return this.summariesService.create(storeEditSummaryDTO);
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
