import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ResponseEntity } from "../utils/entity/utils.entity";
import { LoginDTO, RegisterDTO } from "../utils/dto/utils.dto";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: ResponseEntity })
  Login(@Body() loginDto: LoginDTO): Promise<ResponseEntity> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOkResponse({ type: ResponseEntity })
  Register(@Body() registerDTO: RegisterDTO): Promise<ResponseEntity> {
      return this.authService.register(registerDTO);
  }
}
