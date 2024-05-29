import {HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import {ResponseEntity} from "../utils/entity/utils.entity";
import {StoreEditSummaryDTO} from "../utils/dto/utils.dto";

@Injectable()
export class SummariesService {
    constructor(/*private prisma: PrismaService, private jwtService: JwtService*/) {}

    async create(storeEditSummaryDTO: StoreEditSummaryDTO): Promise<ResponseEntity> {

        return {
            data: storeEditSummaryDTO,
            message: "Summary created",
            status: HttpStatus.CREATED
        }
    }

    async findAll() {

    }

    async findOne(id: number) {

    }

    async remove(id: number) {

    }
}
