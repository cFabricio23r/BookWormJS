//src/auth/auth.service.ts
import {
    HttpException, HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import {ResponseEntity, UserEntity} from "../utils/entity/utils.entity";
import * as bcrypt from 'bcrypt';
import {LoginDTO, RegisterDTO} from "../utils/dto/utils.dto";

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async login(loginDTO: LoginDTO): Promise<ResponseEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDTO.email,
            },
        });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${loginDTO.email}`);
        }

        const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { email: user.email, sub: user.id };

        return {
            data: {
                token: this.jwtService.sign(payload),
            },
            message: 'User logged in successfully',
            status: HttpStatus.CREATED,
        };
    }

    async register(registerDTO: RegisterDTO): Promise<ResponseEntity> {
        const userInDb = await this.prisma.user.findFirst({
            where: {
                email: registerDTO.email
            }
        });

        if (userInDb) {
            throw new HttpException("User already exists", HttpStatus.CONFLICT);
        }

        registerDTO.password = await bcrypt.hash(registerDTO.password, roundsOfHashing);

        const newUser = await this.prisma.user.create({
            data: registerDTO
        });

        return {
            data: new UserEntity(newUser),
            message: "User created successfully",
            status: HttpStatus.CREATED,
        }
    }
}
