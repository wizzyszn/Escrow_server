import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from 'generated/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a new user account
   * @param user User registration data
   * @returns Created user (password excluded)  
   */
  async signUp(user: Prisma.UserCreateInput) {
    try {
      // Validate required fields
      if (!user.email || !user.password) {
        throw new BadRequestException('Email and password are required');
      }

      // Check for existing user
      const existingUser = await this.databaseService.user.findFirst({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        throw new ConflictException('This user already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      // Create new user
      const newUser = await this.databaseService.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
        select: {
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return newUser;
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof ConflictException
      ) {
        throw err;
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('User with this email already exists');
        }
        if (err.code === 'P2000') {
          throw new BadRequestException('Value too long for a field');
        }
        if (err.code === 'P2009') {
          throw new BadRequestException('Invalid user data provided');
        }
        throw new BadRequestException('Database error occurred');
      }

      throw new InternalServerErrorException('Failed to create user account');
    }
  }

  async signIn(user: SignInDto) {
    const { email, password } = user;
    
    try {
      // Validate required fields
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const existingUser = await this.databaseService.user.findUnique({
        where: {
          email,
        },
      });
      if (!existingUser) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      const payload = {
        sub: existingUser.id,
        email: existingUser.email,
        name: existingUser.name
      };
      
      const access_token = await this.jwtService.signAsync(payload);
      
      console.log('access token', access_token);
      return {
        access_token
      };
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof UnauthorizedException ||
        err instanceof ConflictException
      ) {
        throw err;
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Database error occurred');
      }

      throw new InternalServerErrorException('Authentication failed');
    }
  }
}