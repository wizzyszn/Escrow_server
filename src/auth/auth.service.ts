import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from 'generated/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Creates a new user account
   * @param user User registration data
   * @returns Created user (password excluded)
   */
  async signUp(user: Prisma.UserCreateInput) {
    console.log('Received user input:', user); // Debugging log
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
      console.log('Hashed password:', hashedPassword); // Debugging log

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
      console.error('Error during signUp:', err); // Debugging log
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
}