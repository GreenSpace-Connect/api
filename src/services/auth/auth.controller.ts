import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ResponseEntity } from 'src/lib/entities/response.entity';

@Controller({
  path: 'auth',
  version: ['1.0.0'],
})
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    const auth = await this.authService.login(email, password);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: auth,
    });
  }
}
