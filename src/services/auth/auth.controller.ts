import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ResponseEntity } from 'src/utils/entities/response.entity';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../master-data/users/entities/user.entity';

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

  @Post('login-as-admin')
  async loginAsAdmin(@Body() { email, password }: LoginDto) {
    const auth = await this.authService.loginAsAdmin(email, password);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: auth,
    });
  }

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'created',
      data: new UserEntity(user),
    });
  }
}
