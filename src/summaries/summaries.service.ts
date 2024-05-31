import {HttpStatus, Injectable} from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import {ResponseEntity} from "../utils/entity/utils.entity";
import {StoreEditSummaryDTO} from "../utils/dto/utils.dto";
import { pdf } from 'pdf-parse';
import * as fs from 'fs'

@Injectable()
export class SummariesService {
    constructor(private prisma: PrismaService) {}

    async create(): Promise<any> {

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
