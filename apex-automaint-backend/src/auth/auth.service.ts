import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import type { StringValue } from 'ms';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.createUser({
      email: dto.email.toLowerCase(),
      name: dto.name,
      phone: dto.phone,
      passwordHash,
      carMake: dto.carMake,
      carModel: dto.carModel,
      carYear: dto.carYear,
      serviceType: dto.serviceType,
    });
    const accessToken = await this.issueToken(user.id, user.email);
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email.toLowerCase());
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid email or password');

    const accessToken = await this.issueToken(user.id, user.email);
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async me(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(accessToken);
      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException('Invalid token');
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          carMake: user.carMake,
          carModel: user.carModel,
          carYear: user.carYear,
          serviceType: user.serviceType,
          createdAt: user.createdAt,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async issueToken(userId: string, email: string) {
    const expiresIn = (this.config.get<string>('JWT_EXPIRES_IN') ??
      '7d') as StringValue;
    return this.jwtService.signAsync({ sub: userId, email }, { expiresIn });
  }
}
