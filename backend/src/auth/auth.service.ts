import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly accessTokenSecret = 'your_secret_key';
  private readonly refreshTokenSecret = 'your_refresh_secret_key';

  constructor(private readonly usersService: UsersService) {}

  private generateAccessToken(userId: number): string {
    return jwt.sign({ userId }, this.accessTokenSecret, { expiresIn: '15m' });
  }

  private generateRefreshToken(userId: number): string {
    return jwt.sign({ userId }, this.refreshTokenSecret, { expiresIn: '7d' });
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret) as {
        userId: number;
      };

      const user = await this.usersService.findById(decoded.userId);

      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }

      const newAccessToken = this.generateAccessToken(user.id);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new BadRequestException('Invalid or expired refresh token');
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, username, birthDate, gender } = createUserDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const formattedBirthDate = new Date(createUserDto.birthDate)
      .toISOString()
      .split('T')[0];

    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
      username,
      birthDate: formattedBirthDate,
      gender,
    });

    const accessToken = this.generateAccessToken(newUser.id);
    const refreshToken = this.generateRefreshToken(newUser.id);

    return { message: 'Registration successful', accessToken, refreshToken };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { message: 'Registration successful', accessToken, refreshToken };
  }
}
