import {
  Body,
  Controller, Delete, Get, Param, Request,
  Post, UploadedFile, UseGuards, UseInterceptors, ParseUUIDPipe,
} from '@nestjs/common';
import { SummariesService } from './summaries.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ResponseEntity} from "../utils/entity/utils.entity";
import {StoreEditSummaryDTO} from "../utils/dto/utils.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, pdfFileFilter} from "../utils/functions/file.utils";

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
    @Request()
    req: any,
    @UploadedFile()
    file: Express.Multer.File,
    @Body()
    storeEditSummaryDTO: StoreEditSummaryDTO,
  ): Promise<ResponseEntity> {
    storeEditSummaryDTO.file = file;
    storeEditSummaryDTO.userId = req.user.userId;
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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.summariesService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.summariesService.remove(id);
  }
}
