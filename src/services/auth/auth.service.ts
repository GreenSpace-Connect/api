import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entities/login.entity';
import { comparePassword } from 'src/lib/helper/hash.helper';
import { UserEntity } from '../master-data/users/entities/user.entity';
import { Role } from 'src/lib/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: {
        role: true,
      },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = comparePassword(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: new UserEntity(user),
    };
  }

  async loginAsAdmin(email: string, password: string): Promise<AuthEntity> {
    const adminRole = await this.prisma.role.findUnique({
      where: { name: Role.ADMIN },
    });

    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({
      where: { email: email, roleId: adminRole.id },
      include: {
        role: true,
      },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = comparePassword(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: new UserEntity(user),
    };
  }
}
